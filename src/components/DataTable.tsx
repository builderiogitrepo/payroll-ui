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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

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
  customToolbar?: React.ReactNode;
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
  customToolbar,
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
  const [itemsPerPage, setItemsPerPage] = useState(5);

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
    <Card className="border border-border shadow-sm">
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
                <span className="text-muted-foreground">{column.label}:</span>
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
    <div className={cn("p-4 space-y-4", className)}>
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl"
              />
            </div>

            {/* Combined Filter Controls */}
            {filters.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="rounded-xl">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                    {Object.values(activeFilters).some(
                      (value) => value && value !== "all",
                    ) && (
                      <Badge
                        variant="secondary"
                        className="ml-2 h-5 w-5 p-0 text-xs"
                      >
                        {
                          Object.values(activeFilters).filter(
                            (value) => value && value !== "all",
                          ).length
                        }
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64 p-4">
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Filter Options</h4>
                    {filters.map((filter) => (
                      <div key={filter.key} className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">
                          {filter.label}
                        </label>
                        {filter.type === "select" ? (
                          <Select
                            value={activeFilters[filter.key] || "all"}
                            onValueChange={(value) =>
                              setActiveFilters((prev) => ({
                                ...prev,
                                [filter.key]: value,
                              }))
                            }
                          >
                            <SelectTrigger className="w-full h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All</SelectItem>
                              {filter.options?.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : filter.type === "text" ? (
                          <Input
                            placeholder={`Filter ${filter.label}`}
                            value={activeFilters[filter.key] || ""}
                            onChange={(e) =>
                              setActiveFilters((prev) => ({
                                ...prev,
                                [filter.key]: e.target.value,
                              }))
                            }
                            className="w-full h-8 text-xs"
                          />
                        ) : filter.type === "date" ? (
                          <Input
                            type="date"
                            value={activeFilters[filter.key] || ""}
                            onChange={(e) =>
                              setActiveFilters((prev) => ({
                                ...prev,
                                [filter.key]: e.target.value,
                              }))
                            }
                            className="w-full h-8 text-xs"
                          />
                        ) : null}
                      </div>
                    ))}
                    {Object.values(activeFilters).some(
                      (value) => value && value !== "all",
                    ) && (
                      <div className="pt-2 border-t border-border">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setActiveFilters(
                              Object.fromEntries(
                                filters.map((filter) => [filter.key, "all"]),
                              ),
                            )
                          }
                          className="w-full text-xs text-red-600 hover:text-red-700"
                        >
                          Clear All Filters
                        </Button>
                      </div>
                    )}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <div className="flex items-center gap-2">
            {customToolbar}
            {/* Manage Columns */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-xl">
                  <Settings className="h-4 w-4 mr-2" />
                  Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuSeparator />
                {columns.map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.key}
                    checked={visibleColumns.has(column.key)}
                    onCheckedChange={(checked) => {
                      const newVisibleColumns = new Set(visibleColumns);
                      if (checked) {
                        newVisibleColumns.add(column.key);
                      } else {
                        newVisibleColumns.delete(column.key);
                      }
                      setVisibleColumns(newVisibleColumns);
                    }}
                  >
                    {column.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Bulk Actions */}
            {showBulkActions && selectedItems.size > 0 && (
              <div className="flex items-center gap-2 mr-4">
                <Badge variant="secondary">{selectedItems.size} selected</Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="rounded-xl">
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

            <Button variant="outline" size="sm" className="rounded-xl">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>

            {onAdd && (
              <Button onClick={onAdd} size="sm" className="rounded-xl">
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
            <span className="text-sm text-muted-foreground">
              Active filters:
            </span>
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
                        onCheckedChange={(checked) =>
                          handleSelectAll(checked === true)
                        }
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
                            handleSelectItem(
                              item.id || item.empId,
                              checked === true,
                            )
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
        <div className="bg-background border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="sticky-header bg-muted/50">
                  {showBulkActions && (
                    <TableHead className="w-12 bg-muted/50 font-semibold text-foreground">
                      <Checkbox
                        checked={
                          selectedItems.size === paginatedData.length &&
                          paginatedData.length > 0
                        }
                        onCheckedChange={(checked) =>
                          handleSelectAll(checked === true)
                        }
                      />
                    </TableHead>
                  )}
                  {columns
                    .filter((col) => visibleColumns.has(col.key))
                    .map((column) => (
                      <TableHead
                        key={column.key}
                        className={cn(
                          "bg-muted/50 font-semibold text-foreground py-4",
                          column.className,
                          column.sticky && "sticky-column",
                        )}
                      >
                        {column.label}
                      </TableHead>
                    ))}
                  <TableHead className="w-20 bg-muted/50 font-semibold text-foreground">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((item, index) => (
                  <TableRow
                    key={item.id || item.empId || index}
                    className="hover:bg-muted/50 transition-colors duration-100 border-b border-border"
                    style={{ height: "var(--table-row-height)" }}
                  >
                    {showBulkActions && (
                      <TableCell>
                        <Checkbox
                          checked={selectedItems.has(item.id || item.empId)}
                          onCheckedChange={(checked) =>
                            handleSelectItem(
                              item.id || item.empId,
                              checked === true,
                            )
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4 gap-2">
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  aria-disabled={currentPage === 1}
                  tabIndex={currentPage === 1 ? -1 : 0}
                  style={{
                    pointerEvents: currentPage === 1 ? "none" : undefined,
                    opacity: currentPage === 1 ? 0.5 : 1,
                  }}
                />
              </PaginationItem>
              {/* Page numbers with ellipsis */}
              {(() => {
                const items = [];
                let start = Math.max(1, currentPage - 2);
                let end = Math.min(totalPages, currentPage + 2);
                if (currentPage <= 3) {
                  end = Math.min(5, totalPages);
                } else if (currentPage >= totalPages - 2) {
                  start = Math.max(1, totalPages - 4);
                }
                if (start > 1) {
                  items.push(
                    <PaginationItem key={1}>
                      <PaginationLink
                        isActive={currentPage === 1}
                        onClick={() => setCurrentPage(1)}
                      >
                        {1}
                      </PaginationLink>
                    </PaginationItem>,
                  );
                  if (start > 2) {
                    items.push(
                      <PaginationItem key="start-ellipsis">
                        <PaginationEllipsis />
                      </PaginationItem>,
                    );
                  }
                }
                for (let i = start; i <= end; i++) {
                  items.push(
                    <PaginationItem key={i}>
                      <PaginationLink
                        isActive={currentPage === i}
                        onClick={() => setCurrentPage(i)}
                      >
                        {i}
                      </PaginationLink>
                    </PaginationItem>,
                  );
                }
                if (end < totalPages) {
                  if (end < totalPages - 1) {
                    items.push(
                      <PaginationItem key="end-ellipsis">
                        <PaginationEllipsis />
                      </PaginationItem>,
                    );
                  }
                  items.push(
                    <PaginationItem key={totalPages}>
                      <PaginationLink
                        isActive={currentPage === totalPages}
                        onClick={() => setCurrentPage(totalPages)}
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>,
                  );
                }
                return items;
              })()}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  aria-disabled={currentPage === totalPages}
                  tabIndex={currentPage === totalPages ? -1 : 0}
                  style={{
                    pointerEvents:
                      currentPage === totalPages ? "none" : undefined,
                    opacity: currentPage === totalPages ? 0.5 : 1,
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
        {/* Page size selector to the right of pagination */}
        <div className="flex items-center gap-1 justify-end">
          <span className="text-xs text-slate-500">Rows:</span>
          <Select
            value={String(itemsPerPage)}
            onValueChange={(v) => {
              setItemsPerPage(Number(v));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-16 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

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
