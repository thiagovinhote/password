import { ColumnSort } from "@tanstack/react-table";

export default class ColumnSortParser {
  static DESC_FLAG = "-";

  static serialize(columns: ColumnSort[]) {
    return columns.map(this.serializeItem).join(",");
  }

  private static serializeItem(item: ColumnSort) {
    const dir = item.desc ? ColumnSortParser.DESC_FLAG : "";
    return [dir, item.id].join("");
  }

  static deserialize(columns?: string | string[]) {
    if (!columns) return [];
    columns = Array.isArray(columns) ? columns : columns.split(",");
    return columns.map(this.deserializeItem);
  }

  private static deserializeItem(item: string) {
    if (item.startsWith(ColumnSortParser.DESC_FLAG)) {
      return { id: item.slice(1), desc: true };
    }
    return { id: item, desc: false };
  }
}
