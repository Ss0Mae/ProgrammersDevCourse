const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

// JSON 파싱 미들웨어
app.use(express.json());

// 데이터 경로
let DATA_DIR = "/home/programmers/project/data/input";

// 데이터 읽어주는 함수
function readDataFromFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error: ${filePath}: `, error);
    return null;
  }
}

// 1번. 예시 문제
app.get("/api/v1/server-health-check", (req, res) => {
  res.status(200).json({ message: "server is running" });
});

// 2번 문제
app.get("/api/v1/yes-or-no",(req,res)=>{
  const response = Math.random() < 0.5 ? "Yes" : "No";
  res.status(200).json({response});
});

// 3번. 숫자 반환
app.get("/api/v1/random-number", (req, res) => {
  const number = Math.floor(Math.random() * 10) + 1;
  res.status(200).json({ number });
});

// 4번. 현재 날짜 반환
app.get("/api/v1/current-date", (req, res) => {
  const today = new Date();
  const year = today.getFullYear(); // 연도
  const month = String(today.getMonth() + 1).padStart(2, "0"); // 월 (0부터 시작하므로 +1 필요)
  const day = String(today.getDate()).padStart(2, "0"); // 일

  const currentDate = `${year}-${month}-${day}`; // YYYY-MM-DD 형식으로 결합
  res.status(200).json({ date: currentDate });
});

// 5번. 메시지 데이터 검증 및 처리
app.post("/api/v1/validate-message", (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) {
    res.status(400).json({ error: "Invalid data format" });
  } else {
    res.status(200).json({ message: "data saved successfully" });
  }
});

// 6번. 예시 문제
app.get("/api/v1/books/count", (req, res) => {
  const booksFilePath = path.join(DATA_DIR, "books.json");
  const books = readDataFromFile(booksFilePath);
  res.status(200).json({ count: books.length });
});

// 7번. 사용자 계정 수 카운트하기
app.get("/api/v1/users/count", (req, res) => {
  const usersFilePath = path.join(DATA_DIR, "users.json");
  const users = readDataFromFile(usersFilePath);
  res.status(200).json({ count: users.length });
});

// 8번. 사용자 별 대출 도서 권수 조회
app.get("/api/v1/users/:userId/books/count", (req, res) => {
  const userId = parseInt(req.params.userId);
  const borrowingsFilePath = path.join(DATA_DIR, "book_borrowings.json");
  const borrowings = readDataFromFile(borrowingsFilePath);
  const userBorrowings = borrowings.filter((b) => b.user_id === userId);
  res.status(200).json({ userId, count: userBorrowings.length });
});

// 9번. 특정 시점 이후 출판된 도서 목록 조회
app.get("/api/v1/books/recent", (req, res) => {
  const booksFilePath = path.join(DATA_DIR, "books.json");
  const books = readDataFromFile(booksFilePath);
  const recentBooks = books.filter((book) => new Date(book.published_date) > new Date("2001-01-01"));
  res.status(200).json(recentBooks);
});

// 10번. 특정 사용자의 총 반납 예정일 계산
app.get("/api/v1/users/:userId/due-date/total", (req, res) => {
  const userId = parseInt(req.params.userId);
  const usersFilePath = path.join(DATA_DIR, "users.json");
  const users = readDataFromFile(usersFilePath);
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const borrowingsFilePath = path.join(DATA_DIR, "book_borrowings.json");
  const borrowings = readDataFromFile(borrowingsFilePath);
  const userBorrowings = borrowings.filter((b) => b.user_id === userId);

  const totalDueDays = userBorrowings.reduce((sum, borrowing) => {
    const dueDate = new Date(borrowing.dute_date);
    const currentDate = new Date();
    if (dueDate > currentDate) {
      return sum + Math.ceil((dueDate - currentDate) / (1000 * 60 * 60 * 24));
    }
    return sum;
  }, 0);

  res.status(200).json({ userId, totalDueDays });
});

// 11번. 사용자 상세 계정 조회
app.get("/api/v1/users/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  const usersFilePath = path.join(DATA_DIR, "users.json");
  const users = readDataFromFile(usersFilePath);
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(200).json({ id: user.id, username: user.username, created_at: user.created_at });
});

// 12번. 특정 장르의 도서 목록 조회
app.get("/api/v1/books/genre/:genre", (req, res) => {
  const genre = req.params.genre;
  const booksFilePath = path.join(DATA_DIR, "books.json");
  const books = readDataFromFile(booksFilePath);
  const genreBooks = books.filter((book) => book.genre.toLowerCase() === genre.toLowerCase());
  if (genreBooks.length === 0) {
    return res.status(404).json({ error: "Genre not found" });
  }
  res.status(200).json(genreBooks);
});

// 13번. 대출된 특정 장르 도서의 수 카운트
app.get("/api/v1/books/genre-count", (req, res) => {
  const genre = req.query.genre;
  const booksFilePath = path.join(DATA_DIR, "books.json");
  const borrowingsFilePath = path.join(DATA_DIR, "book_borrowings.json");
  const books = readDataFromFile(booksFilePath);
  const borrowings = readDataFromFile(borrowingsFilePath);

  const genreBooks = books.filter((book) => book.genre.toLowerCase() === genre.toLowerCase());
  const borrowedGenreBooks = borrowings.filter((b) => genreBooks.some((g) => g.id === b.book_id));

  if (genreBooks.length === 0) {
    return res.status(404).json({ error: "Genre not found", data: [] });
  }
  res.status(200).json({ genre, count: borrowedGenreBooks.length });
});
// 14번. 사용자 별 도서 대출 정보 조회
app.get("/api/v1/users/:userId/borrowed-books", (req, res) => {
  const userId = parseInt(req.params.userId);
  const usersFilePath = path.join(DATA_DIR, "users.json");
  const users = readDataFromFile(usersFilePath);
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const borrowingsFilePath = path.join(DATA_DIR, "book_borrowings.json");
  const booksFilePath = path.join(DATA_DIR, "books.json");
  const borrowings = readDataFromFile(borrowingsFilePath);
  const books = readDataFromFile(booksFilePath);

  const userBorrowings = borrowings.filter((b) => b.user_id === userId);
  const borrowedBooks = userBorrowings.map((b) => {
    const book = books.find((bk) => bk.id === b.book_id);
    return {
      bookId: book.id,
      title: book.title,
      author: book.author,
      publishedDate: book.published_date,
      genre: book.genre,
    };
  });

  res.status(200).json(borrowedBooks);
});
const PORT = 5678;
app.listen(PORT, () => {
  console.log(`현재 서버가 ${PORT}번에서 정상적으로 구동되고 있습니다.`);
});
