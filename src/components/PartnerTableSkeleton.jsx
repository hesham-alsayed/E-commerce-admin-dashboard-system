import Skeleton from "react-loading-skeleton";

export function PartnerTableSkeleton() {
  return (
    <div className="bg-white border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-[1000px] w-full">
          {/* HEADER */}
          <thead className="bg-gray-50">
            <tr>
              {Array.from({ length: 6 }).map((_, i) => (
                <th key={i} className="p-4">
                  <Skeleton height={12} width={80} />
                </th>
              ))}
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {Array.from({ length: 6 }).map((_, row) => (
              <tr key={row} className="border-t">
                <td className="p-4">
                  <Skeleton height={16} width={140} />
                  <div className="mt-2">
                    <Skeleton height={10} width={80} />
                  </div>
                </td>

                <td className="p-4">
                  <Skeleton height={14} width={180} />
                </td>

                <td className="p-4">
                  <Skeleton height={14} width={40} />
                </td>

                <td className="p-4">
                  <Skeleton height={14} width={100} />
                </td>

                <td className="p-4">
                  <Skeleton height={20} width={70} borderRadius={999} />
                </td>

                <td className="p-4">
                  <Skeleton height={32} width={32} borderRadius={8} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
