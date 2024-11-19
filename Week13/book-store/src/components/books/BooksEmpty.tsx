import { FaSmileWink } from "react-icons/fa";
import { Link } from "react-router-dom";
import Empty from "../common/Empty";

function BooksEmpty() {
    return (
      <Empty
        icon={<FaSmileWink />}
        title="검색 결과가 없습니다."
        description={<Link to="/books">전체 도서 목록을 확인해보세요.</Link>}
      />
    );
}

export default BooksEmpty;