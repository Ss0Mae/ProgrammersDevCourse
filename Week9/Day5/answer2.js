const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

app.use(express.json()); // JSON 파싱 미들웨어

const DATA_DIR = "/home/programmers/project/data/input";

// 데이터 읽기 함수
function readDataFromFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}: `, error);
    return null;
  }
};
// 1. 유저 정보 반환 API
app.get("/api/v1/user-info", (req, res) => {
  res.status(200).json({
    username: "testuser",
    email: "test@example.com"
  });
});

// 2. Hello World 반환 API
app.get("/api/v1/hello-world", (req, res) => {
  res.status(200).json({
    message: "Hello, World!"
  });
});

// 3. 홀수/짝수 판별 API
app.post("/api/v1/odd-or-even", (req, res) => {
  const { number } = req.body;
  if (typeof number !== 'number') {
    return res.status(400).json({ error: "Invalid input" });
  }
  const result = number % 2 === 0 ? "even" : "odd";
  res.status(200).json({ result });
});

// 4. 두 숫자의 합 반환 API
app.post("/api/v1/sum", (req, res) => {
  const { number1, number2 } = req.body;
  if (typeof number1 !== 'number' || typeof number2 !== 'number') {
    return res.status(400).json({ error: "Invalid input" });
  }
  const sum = number1 + number2;
  res.status(200).json({ sum });
});

// 5. 현재 날짜 반환
app.get("/api/v1/current-date", (req, res) => {
  const today = new Date();
  const year = today.getFullYear(); // 연도
  const month = String(today.getMonth() + 1).padStart(2, "0"); // 월 (0부터 시작하므로 +1 필요)
  const day = String(today.getDate()).padStart(2, "0"); // 일

  const currentDate = `${year}-${month}-${day}`; // YYYY-MM-DD 형식으로 결합
  res.status(200).json({ current_date: currentDate });
});

// 6. Echo API
app.post("/api/v1/echo", (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }
  res.status(200).json({ message });
});

// 7. 게시글 개수 반환 API
app.get("/api/v1/posts/count", (req, res) => {
  const posts = readDataFromFile(path.join(DATA_DIR, "posts.json"));
  res.status(200).json({ count: posts.length });
});

// 8. 사용자 이메일 조회 API
app.get("/api/v1/user-email/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  const users = readDataFromFile(path.join(DATA_DIR, "users.json"));
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(200).json({ email: user.email });
});

// 9. 사용자별 게시글 목록 조회 API
app.get("/api/v1/user-posts/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  const posts = readDataFromFile(path.join(DATA_DIR, "posts.json"));
  const userPosts = posts.filter((p) => p.user_id === userId).sort((a, b) => b.id - a.id);
  res.status(200).json(userPosts);
});

// 10. 게시글 수정 API
app.put("/api/v1/posts/:postId", (req, res) => {
  const postId = parseInt(req.params.postId);
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  const posts = readDataFromFile(path.join(DATA_DIR, "posts.json"));
  const post = posts.find((p) => p.id === postId);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  post.title = `${title} - updated`;
  post.content = `${content} (Modified)`;
  post.updated_at = new Date().toISOString().split("T")[0];

  res.status(200).json(post);
});

// 11. 댓글 삭제 API
app.delete("/api/v1/comments/:commentId", (req, res) => {
  const commentId = parseInt(req.params.commentId);
  const comments = readDataFromFile(path.join(DATA_DIR, "comments.json"));
  const comment = comments.find((c) => c.id === commentId);
  if (!comment) {
    return res.status(404).json({ error: "Comment not found" });
  }
  res.status(200).json({
    message: "Comment deleted successfully",
    deleted_comment_id: comment.id
  });
});

// 12. 특정 사용자의 게시글 조회 API
app.get("/api/v1/users/:userId/posts", (req, res) => {
  const userId = parseInt(req.params.userId);
  const users = readDataFromFile(path.join(DATA_DIR, "users.json"));
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const posts = readDataFromFile(path.join(DATA_DIR, "posts.json"));
  const userPosts = posts.filter((p) => p.user_id === userId);
  res.status(200).json(userPosts);
});

// 13. 특정 게시글에 댓글 추가 API
app.post("/api/v1/posts/:postId/comments", (req, res) => {
  const postId = parseInt(req.params.postId);
  const { user_id, content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Comment content is required" });
  }

  const posts = readDataFromFile(path.join(DATA_DIR, "posts.json"));
  const users = readDataFromFile(path.join(DATA_DIR, "users.json"));
  const post = posts.find((p) => p.id === postId);
  const user = users.find((u) => u.id === user_id);

  if (!post || !user) {
    return res.status(404).json({ error: "Post or User not found" });
  }

  const newComment = {
    id: Math.max(...readDataFromFile(path.join(DATA_DIR, "comments.json")).map(c => c.id)) + 1,
    post_id: postId,
    user_id: user_id,
    content: content,
    created_at: new Date().toISOString().split("T")[0]
  };

  res.status(200).json(newComment);
});
//14번
app.get("/api/v1/users/:userId/activity-report", (req, res) => {
  const userId = parseInt(req.params.userId);
  
  // 데이터 파일 경로
  const usersFilePath = path.join(DATA_DIR, "users.json");
  const postsFilePath = path.join(DATA_DIR, "posts.json");
  const commentsFilePath = path.join(DATA_DIR, "comments.json");
  
  // 데이터 읽기
  const users = readDataFromFile(usersFilePath);
  const posts = readDataFromFile(postsFilePath);
  const comments = readDataFromFile(commentsFilePath);

  // 사용자 확인
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // 사용자의 게시글과 댓글 가져오기
  const userPosts = posts.filter((p) => p.user_id === userId);
  const userComments = comments.filter((c) => c.user_id === userId);

  // 활동이 없는 경우 처리
  if (userPosts.length === 0 && userComments.length === 0) {
    return res.status(200).json({ message: "No activity found" });
  }

  // 총 게시글 수와 총 댓글 수 계산
  const totalPosts = userPosts.length;
  const totalComments = userComments.length;

  // 가장 최근 게시글과 댓글 찾기
  let latestPost = null;
  if (userPosts.length > 0) {
    latestPost = userPosts.reduce((latest, current) => {
      return new Date(current.created_at) > new Date(latest.created_at) ? current : latest;
    });
  }

  let latestComment = null;
  if (userComments.length > 0) {
    latestComment = userComments.reduce((latest, current) => {
      return new Date(current.created_at) > new Date(latest.created_at) ? current : latest;
    });
  }

  // 응답 데이터 구성
  const recentActivity = {};
  if (latestPost) {
    recentActivity.latestPost = {
      postId: latestPost.id,
      title: latestPost.title,
      content: latestPost.content,
      createdAt: latestPost.created_at
    };
  }
  if (latestComment) {
    recentActivity.latestComment = {
      commentId: latestComment.id,
      content: latestComment.content,
      createdAt: latestComment.created_at
    };
  }

  res.status(200).json({
    userId,
    totalPosts,
    totalComments,
    recentActivity
  });
});
const PORT = 5678;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});