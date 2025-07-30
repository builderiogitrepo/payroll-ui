#!/bin/bash

# =============================================================================
# TENANT SETUP SCRIPT FOR NEW CUSTOMERS
# =============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# =============================================================================
# CONFIGURATION
# =============================================================================

TENANT_CONFIG_DIR="config/tenants"
TEMPLATE_DIR="config/templates"

# =============================================================================
# USAGE
# =============================================================================

show_usage() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -i, --tenant-id ID        Tenant ID (required)"
    echo "  -n, --tenant-name NAME    Tenant Name (required)"
    echo "  -d, --domain DOMAIN       Tenant Domain (required)"
    echo "  -e, --environment ENV     Environment (development|staging|production)"
    echo "  -a, --api-url URL         API Base URL"
    echo "  -p, --plan PLAN           Subscription Plan (basic|premium|enterprise)"
    echo "  -f, --features FEATURES   Comma-separated feature list"
    echo "  -c, --create-env          Create environment files"
    echo "  -h, --help                Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 -i acme -n 'ACME Corporation' -d acme -e production -p premium"
    echo "  $0 -i startup -n 'Startup Inc' -d startup -e staging -p basic -f 'payroll,attendance'"
}

# =============================================================================
# VALIDATION
# =============================================================================

validate_tenant_id() {
    if [[ ! $1 =~ ^[a-z0-9-]+$ ]]; then
        print_error "Invalid tenant ID: $1"
        print_error "Tenant ID must contain only lowercase letters, numbers, and hyphens"
        exit 1
    fi
}

validate_domain() {
    if [[ ! $1 =~ ^[a-z0-9-]+$ ]]; then
        print_error "Invalid domain: $1"
        print_error "Domain must contain only lowercase letters, numbers, and hyphens"
        exit 1
    fi
}

validate_plan() {
    case $1 in
        basic|premium|enterprise)
            ;;
        *)
            print_error "Invalid plan: $1"
            print_error "Valid plans: basic, premium, enterprise"
            exit 1
            ;;
    esac
}

# =============================================================================
# TENANT CONFIGURATION
# =============================================================================

create_tenant_config() {
    local tenant_id=$1
    local tenant_name=$2
    local domain=$3
    local environment=$4
    local api_url=$5
    local plan=$6
    local features=$7
    
    print_status "Creating tenant configuration for: $tenant_name"
    
    # Create tenant config directory
    mkdir -p "$TENANT_CONFIG_DIR/$tenant_id"
    
    # Create tenant configuration file
    cat > "$TENANT_CONFIG_DIR/$tenant_id/config.json" << EOF
{
  "tenantId": "$tenant_id",
  "tenantName": "$tenant_name",
  "tenantDomain": "$domain",
  "environment": "$environment",
  "apiBaseUrl": "$api_url",
  "subscriptionPlan": "$plan",
  "features": [${features//,/\"\",\"}],
  "createdAt": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "status": "active",
  "settings": {
    "timezone": "UTC",
    "locale": "en-US",
    "currency": "USD",
    "dateFormat": "MM/DD/YYYY",
    "timeFormat": "12h"
  },
  "limits": {
    "maxEmployees": $(get_plan_limit $plan "employees"),
    "maxDepartments": $(get_plan_limit $plan "departments"),
    "maxPayrollRuns": $(get_plan_limit $plan "payrollRuns"),
    "storageGB": $(get_plan_limit $plan "storage")
  }
}
EOF
    
    print_success "Tenant configuration created: $TENANT_CONFIG_DIR/$tenant_id/config.json"
}

get_plan_limit() {
    local plan=$1
    local limit_type=$2
    
    case $plan in
        basic)
            case $limit_type in
                employees) echo "50" ;;
                departments) echo "5" ;;
                payrollRuns) echo "12" ;;
                storage) echo "1" ;;
            esac
            ;;
        premium)
            case $limit_type in
                employees) echo "500" ;;
                departments) echo "20" ;;
                payrollRuns) echo "24" ;;
                storage) echo "10" ;;
            esac
            ;;
        enterprise)
            case $limit_type in
                employees) echo "unlimited" ;;
                departments) echo "unlimited" ;;
                payrollRuns) echo "unlimited" ;;
                storage) echo "100" ;;
            esac
            ;;
    esac
}

# =============================================================================
# ENVIRONMENT FILES
# =============================================================================

create_environment_files() {
    local tenant_id=$1
    local tenant_name=$2
    local domain=$3
    local environment=$4
    local api_url=$5
    
    print_status "Creating environment files for tenant: $tenant_id"
    
    # Create tenant-specific environment files
    for env in development staging production; do
        local env_file="config/environments/${env}-${tenant_id}.env"
        
        # Copy base environment file
        if [ -f "config/environments/${env}.env" ]; then
            cp "config/environments/${env}.env" "$env_file"
            
            # Update tenant-specific variables
            sed -i.bak "s/VITE_TENANT_ID=.*/VITE_TENANT_ID=$tenant_id/" "$env_file"
            sed -i.bak "s/VITE_TENANT_NAME=.*/VITE_TENANT_NAME=$tenant_name/" "$env_file"
            sed -i.bak "s/VITE_TENANT_DOMAIN=.*/VITE_TENANT_DOMAIN=$domain/" "$env_file"
            sed -i.bak "s|VITE_API_BASE_URL=.*|VITE_API_BASE_URL=$api_url|" "$env_file"
            sed -i.bak "s|VITE_TENANT_API_URL=.*|VITE_TENANT_API_URL=$api_url/tenant/$tenant_id|" "$env_file"
            
            # Remove backup file
            rm "${env_file}.bak"
            
            print_success "Environment file created: $env_file"
        else
            print_warning "Base environment file not found: config/environments/${env}.env"
        fi
    done
}

# =============================================================================
# DEPLOYMENT CONFIGURATION
# =============================================================================

create_deployment_config() {
    local tenant_id=$1
    local domain=$2
    local environment=$3
    
    print_status "Creating deployment configuration for tenant: $tenant_id"
    
    # Create deployment config directory
    mkdir -p "deployments/$tenant_id"
    
    # Create Netlify configuration
    cat > "deployments/$tenant_id/netlify.toml" << EOF
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  VITE_TENANT_ID = "$tenant_id"
  VITE_TENANT_DOMAIN = "$domain"
  VITE_APP_ENV = "$environment"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
EOF
    
    # Create Vercel configuration
    cat > "deployments/$tenant_id/vercel.json" << EOF
{
  "version": 2,
  "name": "payroll-ui-$tenant_id",
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "env": {
    "VITE_TENANT_ID": "$tenant_id",
    "VITE_TENANT_DOMAIN": "$domain",
    "VITE_APP_ENV": "$environment"
  },
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
EOF
    
    print_success "Deployment configuration created for tenant: $tenant_id"
}

# =============================================================================
# DATABASE SETUP
# =============================================================================

setup_database() {
    local tenant_id=$1
    local plan=$2
    
    print_status "Setting up database for tenant: $tenant_id"
    
    # This would typically involve:
    # 1. Creating a new database schema
    # 2. Running migrations
    # 3. Setting up initial data
    # 4. Configuring backups
    
    print_warning "Database setup requires backend integration"
    print_status "Please run the following commands on your backend:"
    echo ""
    echo "  # Create tenant database"
    echo "  ./scripts/create-tenant-db.sh $tenant_id $plan"
    echo ""
    echo "  # Run migrations"
    echo "  ./scripts/migrate-tenant.sh $tenant_id"
    echo ""
    echo "  # Setup initial data"
    echo "  ./scripts/seed-tenant.sh $tenant_id"
}

# =============================================================================
# DOCUMENTATION
# =============================================================================

create_documentation() {
    local tenant_id=$1
    local tenant_name=$2
    local domain=$3
    local environment=$4
    local api_url=$5
    local plan=$6
    
    print_status "Creating documentation for tenant: $tenant_id"
    
    # Create documentation directory
    mkdir -p "docs/tenants/$tenant_id"
    
    # Create tenant documentation
    cat > "docs/tenants/$tenant_id/README.md" << EOF
# Tenant Configuration: $tenant_name

## Overview
- **Tenant ID**: $tenant_id
- **Domain**: $domain
- **Environment**: $environment
- **API URL**: $api_url
- **Plan**: $plan
- **Created**: $(date)

## Configuration Files
- Environment: \`config/environments/${environment}-${tenant_id}.env\`
- Tenant Config: \`config/tenants/${tenant_id}/config.json\`
- Deployment: \`deployments/${tenant_id}/\`

## Deployment
\`\`\`bash
# Deploy to development
./scripts/deploy.sh -e development -t $tenant_id -n "$tenant_name" -d $domain -a $api_url

# Deploy to staging
./scripts/deploy.sh -e staging -t $tenant_id -n "$tenant_name" -d $domain -a $api_url

# Deploy to production
./scripts/deploy.sh -e production -t $tenant_id -n "$tenant_name" -d $domain -a $api_url -p netlify
\`\`\`

## Features
Based on the $plan plan, this tenant has access to:
$(get_plan_features $plan)

## Limits
- Max Employees: $(get_plan_limit $plan "employees")
- Max Departments: $(get_plan_limit $plan "departments")
- Max Payroll Runs: $(get_plan_limit $plan "payrollRuns")
- Storage: $(get_plan_limit $plan "storage") GB

## Support
For tenant-specific support, contact: support@payroll.com
EOF
    
    print_success "Documentation created: docs/tenants/$tenant_id/README.md"
}

get_plan_features() {
    local plan=$1
    
    case $plan in
        basic)
            echo "- Basic payroll processing"
            echo "- Employee management"
            echo "- Attendance tracking"
            echo "- Basic reporting"
            ;;
        premium)
            echo "- All basic features"
            echo "- Advanced reporting"
            echo "- Tax calculations"
            echo "- Multiple departments"
            echo "- API access"
            ;;
        enterprise)
            echo "- All premium features"
            echo "- Custom integrations"
            echo "- White-label options"
            echo "- Priority support"
            echo "- Custom workflows"
            ;;
    esac
}

# =============================================================================
# MAIN EXECUTION
# =============================================================================

main() {
    # Parse command line arguments
    local tenant_id=""
    local tenant_name=""
    local domain=""
    local environment="development"
    local api_url="http://localhost:3000/api"
    local plan="basic"
    local features="payroll,attendance"
    local create_env=false
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            -i|--tenant-id)
                tenant_id="$2"
                shift 2
                ;;
            -n|--tenant-name)
                tenant_name="$2"
                shift 2
                ;;
            -d|--domain)
                domain="$2"
                shift 2
                ;;
            -e|--environment)
                environment="$2"
                shift 2
                ;;
            -a|--api-url)
                api_url="$2"
                shift 2
                ;;
            -p|--plan)
                plan="$2"
                shift 2
                ;;
            -f|--features)
                features="$2"
                shift 2
                ;;
            -c|--create-env)
                create_env=true
                shift
                ;;
            -h|--help)
                show_usage
                exit 0
                ;;
            *)
                print_error "Unknown option: $1"
                show_usage
                exit 1
                ;;
        esac
    done
    
    # Validate required parameters
    if [ -z "$tenant_id" ] || [ -z "$tenant_name" ] || [ -z "$domain" ]; then
        print_error "Missing required parameters"
        show_usage
        exit 1
    fi
    
    # Validate inputs
    validate_tenant_id "$tenant_id"
    validate_domain "$domain"
    validate_plan "$plan"
    
    print_status "Setting up tenant: $tenant_name"
    print_status "Tenant ID: $tenant_id"
    print_status "Domain: $domain"
    print_status "Environment: $environment"
    print_status "Plan: $plan"
    
    # Create tenant configuration
    create_tenant_config "$tenant_id" "$tenant_name" "$domain" "$environment" "$api_url" "$plan" "$features"
    
    # Create environment files if requested
    if [ "$create_env" = true ]; then
        create_environment_files "$tenant_id" "$tenant_name" "$domain" "$environment" "$api_url"
    fi
    
    # Create deployment configuration
    create_deployment_config "$tenant_id" "$domain" "$environment"
    
    # Setup database (placeholder)
    setup_database "$tenant_id" "$plan"
    
    # Create documentation
    create_documentation "$tenant_id" "$tenant_name" "$domain" "$environment" "$api_url" "$plan"
    
    print_success "Tenant setup completed successfully!"
    print_status "Next steps:"
    echo "  1. Review configuration in config/tenants/$tenant_id/"
    echo "  2. Deploy using: ./scripts/deploy.sh -e $environment -t $tenant_id -n '$tenant_name' -d $domain -a $api_url"
    echo "  3. Configure backend for tenant: $tenant_id"
}

# Run main function
main "$@" 