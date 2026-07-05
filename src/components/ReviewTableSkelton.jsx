import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { TableRow, TableCell } from "@mui/material";

export default function ReviewTableSkeleton({ rows = 8 }) {
  return Array.from({ length: rows }).map((_, i) => (
    <TableRow key={i}>
      {/* checkbox */}
      <TableCell padding="checkbox">
        <Skeleton width={18} height={18} />
      </TableCell>

      {/* user */}
      <TableCell>
        <div className="flex items-center gap-2">
          <Skeleton circle width={32} height={32} />
          <Skeleton width={100} />
        </div>
      </TableCell>

      {/* product */}
      <TableCell>
        <div className="flex items-center gap-2">
          <Skeleton width={32} height={32} />
          <Skeleton width={120} />
        </div>
      </TableCell>

      {/* rating */}
      <TableCell>
        <Skeleton width={80} />
      </TableCell>

      {/* comment */}
      <TableCell>
        <Skeleton width={180} />
      </TableCell>

      {/* date */}
      <TableCell>
        <Skeleton width={90} />
      </TableCell>

      {/* actions */}
      <TableCell>
        <Skeleton width={25} height={25} />
      </TableCell>
    </TableRow>
  ));
}