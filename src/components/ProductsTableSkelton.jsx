import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProductsTableSkeleton({ rows = 6 }) {
  return (
    <div className="w-full animate-pulse">
      <table className="w-full">
        {/* HEADER */}
        <thead>
          <tr>
            {Array.from({ length: 11 }).map((_, i) => (
              <th key={i} className="p-3 text-left">
                <Skeleton height={12} width={70} />
              </th>
            ))}
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i}>
              <td className="p-3">
                <Skeleton width={18} height={18} />
              </td>

              <td className="p-3">
                <Skeleton width={90} />
              </td>

              <td className="p-3">
                <Skeleton width={120} />
              </td>

              <td className="p-3">
                <Skeleton circle width={40} height={40} />
              </td>

              <td className="p-3">
                <Skeleton width={80} />
              </td>

              <td className="p-3">
                <Skeleton width={80} />
              </td>

              <td className="p-3">
                <Skeleton width={60} />
              </td>

              <td className="p-3">
                <Skeleton width={50} />
              </td>

              <td className="p-3">
                <Skeleton width={70} height={20} />
              </td>

              <td className="p-3">
                <Skeleton width={100} />
              </td>

              <td className="p-3">
                <Skeleton width={30} height={30} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
