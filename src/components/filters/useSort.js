import { BiSortAlt2 } from "react-icons/bi";
import { RiSortNumberAsc, RiSortNumberDesc } from "react-icons/ri";
import { useSearchParams } from "react-router-dom";

export function useSort() {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get("sort") || "";

  const setSort = (field) => {
    const params = new URLSearchParams(searchParams);

    let current = sort ? sort.split(",") : [];

    const asc = field;
    const desc = `-${field}`;

    if (current.includes(asc)) {
      // asc → desc
      current = current.map((f) => (f === asc ? desc : f));
    } else if (current.includes(desc)) {
      // desc → remove
      current = current.filter((f) => f !== desc);
    } else {
      // add new
      current.push(asc);
    }

    if (current.length > 0) {
      params.set("sort", current.join(","));
    } else {
      params.delete("sort");
    }

    setSearchParams(params);
  };

  const getSortType = (field) => {
    const current = sort.split(",");

    if (current.includes(field)) return "asc";
    if (current.includes(`-${field}`)) return "desc";
    return "none";
  };

  return {
    sort,
    setSort,
    getSortType,
  };
}
