import React, { ReactNode, useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Search,
  Filter,
  Download,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Settings,
  ChevronDown,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => ReactNode;
  className?: string;
  sticky?: boolean;
  hiddenOnMobile?: boolean;
}

export interface Filter {
  key: string;
  label: string;
  type: "select" | "text" | "date";
  options?: { value: string; label: string }[];
}

export interface SmartFilter {
  key: string;
  label: string;
  icon?: string;
  filter: (data: any[]) => any[];
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  filters?: Filter[];
  smartFilters?: SmartFilter[];
  searchPlaceholder?: string;
  onAdd?: () => void;
  onView?: (item: any) => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  addButtonText?: string;
  showBulkActions?: boolean;
  onBulkAction?: (action: string, selectedItems: any[]) => void;
  enableMobileCards?: boolean;
  className?: string;
}

export function DataTable({
  data,
  columns,
  filters = [],
  smartFilters = [],
  searchPlaceholder = "Search",
  onAdd,
  onView,
  onEdit,
  onDelete,
  addButtonText = "Add New",
  showBulkActions = true,
  onBulkAction,
  enableMobileCards = true,
  className,
}: DataTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    Object.fromEntries(filters.map((filter) => [filter.key, "all"])),
  );
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set(columns.map((col) => col.key)),
  );
  const [activeSmartFilter, setActiveSmartFilter] = useState<string | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);

  // Filter and search data
  const filteredData = useMemo(() => {
    let result = data;

    // Apply smart filter first
    if (activeSmartFilter) {
      const smartFilter = smartFilters.find((f) => f.key === activeSmartFilter);
      if (smartFilter) {
        result = smartFilter.filter(result);
      }
    }

    // Apply search
    if (searchQuery) {
      result = result.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      );
    }

    // Apply filters
    result = result.filter((item) =>
      Object.entries(activeFilters).every(
        ([key, value]) =>
          value === "" || value === "all" || String(item[key]) === value,
      ),
    );

    return result;
  }, [data, searchQuery, activeFilters, activeSmartFilter, smartFilters]);

  // Pagination
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(
        new Set(paginatedData.map((item) => item.id || item.empId)),
      );
    } else {
      setSelectedItems(new Set());
    }
  };

  const handleSelectItem = (itemId: string, checked: boolean) => {
    const newSelection = new Set(selectedItems);
    if (checked) {
      newSelection.add(itemId);
    } else {
      newSelection.delete(itemId);
    }
    setSelectedItems(newSelection);
  };

  const handleBulkAction = (action: string) => {
    if (onBulkAction) {
      const selectedData = data.filter((item) =>
        selectedItems.has(item.id || item.empId),
      );
      onBulkAction(action, selectedData);
    }
    setSelectedItems(new Set());
  };

  // Mobile Card Component
  const MobileCard = ({ item }: { item: any }) => (
    <Card className="mobile-card hover-lift mb-3">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="mobile-card-header">
            {item.name || item.structureName || item.title || `Item ${item.id}`}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onView && (
                <DropdownMenuItem onClick={() => onView(item)}>
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </DropdownMenuItem>
              )}
              {onEdit && (
                <DropdownMenuItem onClick={() => onEdit(item)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
              )}
              {onDelete && (
                <DropdownMenuItem
                  onClick={() => onDelete(item)}
                  className="text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mobile-card-content space-y-2">
          {columns
            .filter((col) => !col.hiddenOnMobile && visibleColumns.has(col.key))
            .slice(0, 4) // Show max 4 fields on mobile
            .map((column) => (
              <div key={column.key} className="flex justify-between text-sm">
                <span className="text-gray-600">{column.label}:</span>
                <span className="font-medium">
                  {column.render
                    ? column.render(item[column.key], item)
                    : item[column.key]}
                </span>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header with Search and Smart Filters */}
      <div className="space-y-4">
        {/* Smart Filters Bar */}
        {smartFilters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <Button
              variant={activeSmartFilter === null ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveSmartFilter(null)}
              className="h-8"
            >
              All ({data.length})
            </Button>
            {smartFilters.map((filter) => {
              const filteredCount = filter.filter(data).length;
              return (
                <Button
                  key={filter.key}
                  variant={
                    activeSmartFilter === filter.key ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setActiveSmartFilter(filter.key)}
                  className="h-8"
                >
                  {filter.label} ({filteredCount})
                </Button>
              );
            })}
          </div>
        )}

        {/* Main Toolbar */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Quick Filters */}
            {filters.map((filter) => (
              <Select
                key={filter.key}
                value={activeFilters[filter.key] || "all"}
                onValueChange={(value) =>
                  setActiveFilters((prev) => ({
                    ...prev,
                    [filter.key]: value === "all" ? "" : value,
                  }))
                }
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder={filter.label} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All {filter.label}</SelectItem>
                  {filter.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}

            {/* Column Visibility */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {columns.map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.key}
                    checked={visibleColumns.has(column.key)}
                    onCheckedChange={(checked) => {
                      const newVisible = new Set(visibleColumns);
                      if (checked) {
                        newVisible.add(column.key);
                      } else {
                        newVisible.delete(column.key);
                      }
                      setVisibleColumns(newVisible);
                    }}
                  >
                    {column.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2">
            {/* Bulk Actions */}
            {showBulkActions && selectedItems.size > 0 && (
              <div className="flex items-center gap-2 mr-4">
                <Badge variant="secondary">{selectedItems.size} selected</Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Bulk Actions
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => handleBulkAction("export")}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Export Selected
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleBulkAction("delete")}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Selected
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}

            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>

            {onAdd && (
              <Button onClick={onAdd} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                {addButtonText}
              </Button>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {(Object.keys(activeFilters).some(
          (key) => activeFilters[key] && activeFilters[key] !== "all",
        ) ||
          activeSmartFilter) && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            {Object.entries(activeFilters)
              .filter(([_, value]) => value && value !== "all")
              .map(([key, value]) => {
                const filter = filters.find((f) => f.key === key);
                const option = filter?.options?.find((o) => o.value === value);
                return (
                  <Badge key={key} variant="secondary" className="gap-1">
                    {filter?.label}: {option?.label || value}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() =>
                        setActiveFilters((prev) => ({ ...prev, [key]: "all" }))
                      }
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                );
              })}
            {activeSmartFilter && (
              <Badge variant="secondary" className="gap-1">
                {smartFilters.find((f) => f.key === activeSmartFilter)?.label}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => setActiveSmartFilter(null)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {enableMobileCards ? (
          <div className="space-y-3">
            {paginatedData.map((item, index) => (
              <MobileCard key={item.id || item.empId || index} item={item} />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {showBulkActions && (
                    <TableHead className="w-12">
                      <Checkbox
                        checked={
                          selectedItems.size === paginatedData.length &&
                          paginatedData.length > 0
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                  )}
                  {columns
                    .filter((col) => visibleColumns.has(col.key))
                    .map((column) => (
                      <TableHead key={column.key} className={column.className}>
                        {column.label}
                      </TableHead>
                    ))}
                  <TableHead className="w-20">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((item, index) => (
                  <TableRow key={item.id || item.empId || index}>
                    {showBulkActions && (
                      <TableCell>
                        <Checkbox
                          checked={selectedItems.has(item.id || item.empId)}
                          onCheckedChange={(checked) =>
                            handleSelectItem(item.id || item.empId, checked)
                          }
                        />
                      </TableCell>
                    )}
                    {columns
                      .filter((col) => visibleColumns.has(col.key))
                      .map((column) => (
                        <TableCell
                          key={column.key}
                          className={cn(
                            column.className,
                            column.sticky && "sticky-column",
                          )}
                        >
                          {column.render
                            ? column.render(item[column.key], item)
                            : item[column.key]}
                        </TableCell>
                      ))}
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {onView && (
                            <DropdownMenuItem onClick={() => onView(item)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                          )}
                          {onEdit && (
                            <DropdownMenuItem onClick={() => onEdit(item)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                          )}
                          {onDelete && (
                            <DropdownMenuItem
                              onClick={() => onDelete(item)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="sticky-header">
                  {showBulkActions && (
                    <TableHead className="w-12">
                      <Checkbox
                        checked={
                          selectedItems.size === paginatedData.length &&
                          paginatedData.length > 0
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                  )}
                  {columns
                    .filter((col) => visibleColumns.has(col.key))
                    .map((column) => (
                      <TableHead
                        key={column.key}
                        className={cn(
                          column.className,
                          column.sticky && "sticky-column",
                        )}
                      >
                        {column.label}
                      </TableHead>
                    ))}
                  <TableHead className="w-20">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((item, index) => (
                  <TableRow
                    key={item.id || item.empId || index}
                    className="hover:bg-gray-50"
                    style={{ height: "var(--table-row-height)" }}
                  >
                    {showBulkActions && (
                      <TableCell>
                        <Checkbox
                          checked={selectedItems.has(item.id || item.empId)}
                          onCheckedChange={(checked) =>
                            handleSelectItem(item.id || item.empId, checked)
                          }
                        />
                      </TableCell>
                    )}
                    {columns
                      .filter((col) => visibleColumns.has(col.key))
                      .map((column) => (
                        <TableCell
                          key={column.key}
                          className={cn(
                            column.className,
                            column.sticky && "sticky-column",
                          )}
                        >
                          {column.render
                            ? column.render(item[column.key], item)
                            : item[column.key]}
                        </TableCell>
                      ))}
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {onView && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onView(item)}
                            className="h-7 w-7 p-0"
                            title="View"
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        )}
                        {onEdit && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(item)}
                            className="h-7 w-7 p-0"
                            title="Edit"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0"
                            >
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {onDelete && (
                              <DropdownMenuItem
                                onClick={() => onDelete(item)}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
            {filteredData.length} results
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum =
                  Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                return (
                  <Button
                    key={pageNum}
                    variant={pageNum === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className="w-8 h-8 p-0"
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">📋</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No results found
          </h3>
          <p className="text-gray-600 mb-4">
            {searchQuery ||
            Object.values(activeFilters).some((v) => v) ||
            activeSmartFilter
              ? "Try adjusting your search or filters"
              : "Get started by adding your first entry"}
          </p>
          {onAdd &&
            !searchQuery &&
            !Object.values(activeFilters).some((v) => v) && (
              <Button onClick={onAdd}>
                <Plus className="h-4 w-4 mr-2" />
                {addButtonText}
              </Button>
            )}
        </div>
      )}
    </div>
  );
}
