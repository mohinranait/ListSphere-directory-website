import React, { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Define column type
export type Column = {
  title: string;
  dataIndex: string;
  key: string;
  render?: (text: string, record: any, index: number) => React.ReactNode;
};

// data type
type DataSource = {
  [key: string]: any;
};

// Component type
type TableType = {
  columns: Column[];
  dataSource: DataSource[];
  actionWidth?: number | string;
};

const GlobalTable: FC<TableType> = ({ columns, dataSource, actionWidth }) => {
  return (
    <Table className=" border text-muted-foreground ">
      <TableHeader className="">
        <TableRow className=" rounded-2xl  ">
          {columns?.map((column) => {
            return (
              <TableHead
                key={column?.key}
                className={` text-nowrap border-b  text-muted-foreground`}
                style={{
                  width: column?.title == "Action" ? actionWidth : "auto",
                }}
              >
                {column?.title}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {dataSource?.map((item, index) => (
          <TableRow
            key={index}
            className="rounded-lg bg-background-mist dark:bg-portal-bg"
          >
            {columns?.map((column, i) => (
              <TableCell
                key={i}
                className={`font-medium text-text-gray`}
                style={{
                  width: column?.title == "Action" ? actionWidth : "auto",
                }}
              >
                {column.render
                  ? column.render(
                      item[column.dataIndex],
                      item,
                      dataSource.indexOf(item)
                    )
                  : item[column.dataIndex]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default GlobalTable;
