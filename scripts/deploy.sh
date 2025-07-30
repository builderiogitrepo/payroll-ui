#!/bin/bash

# =============================================================================
# MULTI-TENANT DEPLOYMENT SCRIPT
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

# Default values
ENVIRONMENT="development"
TENANT_ID="default"
TENANT_NAME="Default Company"
TENANT_DOMAIN="default"
API_BASE_URL="http://localhost:3000/api"
BUILD_OUTPUT="dist"
DEPLOY_TARGET="local"

# =============================================================================
# USAGE
# =============================================================================

show_usage() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -e, --environment ENV     Environment (development|staging|production)"
    echo "  -t, --tenant ID           Tenant ID"
    echo "  -n, --tenant-name NAME    Tenant Name"
    echo "  -d, --tenant-domain DOMAIN Tenant Domain"
    echo "  -a, --api-url URL         API Base URL"
    echo "  -o, --output DIR          Build output directory"
    echo "  -p, --platform PLATFORM   Deployment platform (local|netlify|vercel|aws)"
    echo "  -h, --help                Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 -e development -t acme -n 'ACME Corp' -d acme"
    echo "  $0 -e staging -t staging -n 'Staging Company' -d staging -a https://api-staging.payroll.com/api"
    echo "  $0 -e production -t production -n 'Production Company' -d production -a https://api.payroll.com/api -p netlify"
}

# =============================================================================
# ARGUMENT PARSING
# =============================================================================

while [[ $# -gt 0 ]]; do
    case $1 in
        -e|--environment)
            ENVIRONMENT="$2"
            shift 2
            ;;
        -t|--tenant)
            TENANT_ID="$2"
            shift 2
            ;;
        -n|--tenant-name)
            TENANT_NAME="$2"
            shift 2
            ;;
        -d|--tenant-domain)
            TENANT_DOMAIN="$2"
            shift 2
            ;;
        -a|--api-url)
            API_BASE_URL="$2"
            shift 2
            ;;
        -o|--output)
            BUILD_OUTPUT="$2"
            shift 2
            ;;
        -p|--platform)
            DEPLOY_TARGET="$2"
            shift 2
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

# =============================================================================
# VALIDATION
# =============================================================================

validate_environment() {
    case $ENVIRONMENT in
        development|staging|production)
            ;;
        *)
            print_error "Invalid environment: $ENVIRONMENT"
            print_error "Valid environments: development, staging, production"
            exit 1
            ;;
    esac
}

validate_platform() {
    case $DEPLOY_TARGET in
        local|netlify|vercel|aws)
            ;;
        *)
            print_error "Invalid platform: $DEPLOY_TARGET"
            print_error "Valid platforms: local, netlify, vercel, aws"
            exit 1
            ;;
    esac
}

# =============================================================================
# ENVIRONMENT CONFIGURATION
# =============================================================================

setup_environment() {
    print_status "Setting up environment: $ENVIRONMENT"
    
    # Copy environment file
    if [ -f "config/environments/${ENVIRONMENT}.env" ]; then
        cp "config/environments/${ENVIRONMENT}.env" .env
        print_success "Environment file copied: config/environments/${ENVIRONMENT}.env"
    else
        print_warning "Environment file not found: config/environments/${ENVIRONMENT}.env"
        print_status "Using default environment configuration"
    fi
    
    # Update tenant-specific variables
    export VITE_TENANT_ID="$TENANT_ID"
    export VITE_TENANT_NAME="$TENANT_NAME"
    export VITE_TENANT_DOMAIN="$TENANT_DOMAIN"
    export VITE_API_BASE_URL="$API_BASE_URL"
    export VITE_APP_ENV="$ENVIRONMENT"
    
    print_success "Environment variables set"
}

# =============================================================================
# BUILD PROCESS
# =============================================================================

build_application() {
    print_status "Building application for $ENVIRONMENT environment..."
    
    # Clean previous build
    if [ -d "$BUILD_OUTPUT" ]; then
        rm -rf "$BUILD_OUTPUT"
        print_status "Cleaned previous build"
    fi
    
    # Install dependencies if needed
    if [ ! -d "node_modules" ]; then
        print_status "Installing dependencies..."
        npm install
    fi
    
    # Build the application
    print_status "Building with Vite..."
    npm run build
    
    if [ $? -eq 0 ]; then
        print_success "Build completed successfully"
    else
        print_error "Build failed"
        exit 1
    fi
}

# =============================================================================
# DEPLOYMENT
# =============================================================================

deploy_local() {
    print_status "Deploying locally..."
    
    # Start development server
    print_status "Starting development server..."
    npm run dev
}

deploy_netlify() {
    print_status "Deploying to Netlify..."
    
    # Check if netlify-cli is installed
    if ! command -v netlify &> /dev/null; then
        print_error "Netlify CLI not found. Please install it first:"
        print_error "npm install -g netlify-cli"
        exit 1
    fi
    
    # Deploy to Netlify
    netlify deploy --prod --dir="$BUILD_OUTPUT"
    
    if [ $? -eq 0 ]; then
        print_success "Deployed to Netlify successfully"
    else
        print_error "Netlify deployment failed"
        exit 1
    fi
}

deploy_vercel() {
    print_status "Deploying to Vercel..."
    
    # Check if vercel-cli is installed
    if ! command -v vercel &> /dev/null; then
        print_error "Vercel CLI not found. Please install it first:"
        print_error "npm install -g vercel"
        exit 1
    fi
    
    # Deploy to Vercel
    vercel --prod
    
    if [ $? -eq 0 ]; then
        print_success "Deployed to Vercel successfully"
    else
        print_error "Vercel deployment failed"
        exit 1
    fi
}

deploy_aws() {
    print_status "Deploying to AWS..."
    
    # This would require AWS CLI and S3/CloudFront setup
    print_warning "AWS deployment requires additional setup"
    print_status "Please configure AWS CLI and S3 bucket for deployment"
    
    # Example AWS deployment commands (uncomment and configure as needed)
    # aws s3 sync "$BUILD_OUTPUT" s3://your-bucket-name --delete
    # aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
}

# =============================================================================
# MAIN EXECUTION
# =============================================================================

main() {
    print_status "Starting deployment process..."
    print_status "Environment: $ENVIRONMENT"
    print_status "Tenant ID: $TENANT_ID"
    print_status "Tenant Name: $TENANT_NAME"
    print_status "Tenant Domain: $TENANT_DOMAIN"
    print_status "API URL: $API_BASE_URL"
    print_status "Deploy Target: $DEPLOY_TARGET"
    
    # Validate inputs
    validate_environment
    validate_platform
    
    # Setup environment
    setup_environment
    
    # Build application
    build_application
    
    # Deploy based on target
    case $DEPLOY_TARGET in
        local)
            deploy_local
            ;;
        netlify)
            deploy_netlify
            ;;
        vercel)
            deploy_vercel
            ;;
        aws)
            deploy_aws
            ;;
    esac
    
    print_success "Deployment completed successfully!"
}

# Run main function
main "$@" 