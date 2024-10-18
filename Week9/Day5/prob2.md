# 블로그 콘텐츠 관리 API Server 구축

> 응시자는 아래의 요구사항에 맞는 응답을 처리하기 위한 API 서버를 완성해야 합니다. `채점하기` 버튼을 누르면 응시자가 구성한 서버로 요청을 보내 채점을 진행합니다. 각 문항별 `요청(Request)`은 채점코드가 요청하는 내용을 의미하고 `응답(Response)`는 응시자가 구현한 서버에서 응답하는 내용을 의미합니다. 지문에 있는 요청 예시 및 응답 예시는 실제 채점 케이스와는 다릅니다.

- 주소 : 모든 IP에서 접근할 수 있도록 0.0.0.0으로 실행합니다.
- 포트 : 5678을 사용하여 실행합니다.

localhost 혹은 127.0.0.1로 서버가 실행되거나 5678이외의 포트를 사용한다면 채점이 이루어지지 않습니다.

## 1. 문제 풀이의 기본 조건

> 유그렙은 블로그 콘텐츠 관리에 필요한 여러 기능 제공하는 API Server 구현을 요청받았습니다. 요청 사항을 만족하는 API Server를 개발해주세요.

- 구현해야 하는 서버의 endpoint는 아래와 같습니다.
  ```
  - 0.0.0.0:5678
    - /api/v1/user-info
    - /api/v1/hello-world
    - /api/v1/odd-or-even
    - /api/v1/sum
    - /api/v1/current-date
    - /api/v1/echo
    - /api/v1/posts/count
    - /api/v1/user-email/{int:userId}
    - /api/v1/user-posts/{int:userId}
    - /api/v1/posts/{int:postId}
    - /api/v1/comments/{int:commentId}s
    - /api/v1/users/{int:userId}/posts
    - /api/v1/posts/{int:postId}/comments
    - /api/v1/users/{int:userId}/activity-report
  ```

- 조건에 맞는 요청과 응답을 처리하기 위해서는 프로젝트 환경에 제공된 데이터 활용이 필요합니다. 데이터 파일의 위치와 상세 정보는 아래와 같습니다.
  ```
  /project
    /data
      /input
        users.json
        posts.json
        comments.json
  ```

  **users.json**
  | key     | type | 설명 | 비고  |
  | ------- | ---------- | -------- | -------- |
  | `id`      | integer    |    | PK | 
  | `username` | string    |  사용자의 이름  | |
  | `email` | string     | 사용자의 이메일     | |
  | `created_at` | string     |   사용자의 계정이 생성된 일자      | `YYYY-MM-DD` 형식 |

  **posts.json**
  | key     | type | 설명  | 비고 |
  | ------- | ---------- | -------- | -------- |
  | `id`      | integer    |   | PK | 
  | `user_id`      | integer    |  작성자 ID  | FK, `users.json`의 `id` 참조 | 
  | `title` | string    | 게시글 제목  |  |
  | `content` | string     | 게시글 내용  | |
  | `created_at` | string  |  게시일  | `YYYY-MM-DD` 형식 |
  | `updated_at` | string     | 최종 수정일 | `YYYY-MM-DD` 형식 |

  **comments.json**
  | key     | type | 설명  | 비고 |
  | ------- | ---------- | -------- | -------- |
  | `id`      | integer    |    | PK | 
  | `post_id` | integer    | 게시글 ID  | FK, `posts.json`의 `id` 참조 |
  | `user_id` | integer     | 댓글 작성자 ID  | FK, `users.json`의 `id` 참조 |
  | `content` | string  |  댓글 내용  |  |
  | `created_at` | string     | 댓글 작성 일자 | `YYYY-MM-DD` 형식 |

## 2. API 개요
### 2.1. 공통 사항
별도의 언급이 없는 경우 아래 조건에 맞춰 응답을 처리합니다.
- API 서버의 정상 응답은 상태 코드 `200`을 포함하여 전송합니다.
- Header의 `Content-Type`을 `application/json`으로 설정하고 JSON 형식으로 응답합니다.

### 2.2. 응답 처리
- 본 문제는 실제 데이터베이스를 사용하지 않습니다. 
- 따라서 주어진 JSON 파일을 활용하여 데이터를 읽고 필요한 응답은 DB 혹은 파일 형태로 저장하지 않고 HTTP Response 형태로 반환해야합니다.

## 3. API 상세

### 1번 문제. 서버 헬스 체크

---

클라이언트 요청 사항에 대해 서버는 특정 유저에 대한 데이터를 응답하는 API를 구현합니다.
항상 아래와 같은 유저 정보를 반환해야합니다.
```json
{
  "username": "testuser",
  "email": "test@example.com"
}
```

#### ✅ 구현 조건

**요청 형식**
- URL: `0.0.0.0:5678/api/v1/user-info`
- method: `GET`

**응답 형식**
- 성공적인 요청의 경우
  - 서버는 JSON 형식으로 응답
  - 하드 코딩된 유저 정보를 반환

#### ✅ 요청 예시

```bash
curl -X GET "0.0.0.0:5678/api/v1/user-info" \
-H 'Content-Type: application/json'
```

#### ✅ 응답 예시

**GET 요청이 성공한 경우**
```json
{
  "username": "testuser",
  "email": "test@example.com"
}
```

### 2번 문제. Hello World! 반환하기

---

클라이언트가 요청을 보내면 서버는 "Hello, World!" 메시지를 반환하는 API를 구현합니다.

#### ✅ 구현 조건

**요청 형식**
- URL: `0.0.0.0:5678/api/v1/hello-world`
- method: `GET`

**응답 형식**
- 성공적인 요청의 경우
  - 서버는 JSON 형식으로 응답
  - `{"message": "Hello, World!"}` 라는 메시지를 반환

#### ✅ 요청 예시

```bash
curl -X GET "0.0.0.0:5678/api/v1/hello-world" \
-H 'Content-Type: application/json'
```

#### ✅ 응답 예시

**GET 요청이 성공한 경우**
```json
{
  "message": "Hello, World!"
}
```

### 3번 문제. 홀수/짝수 판별하기

---

클라이언트가 보낸 숫자가 홀수인지 짝수인지를 판별하는 API를 구현합니다. 요청은 숫자를 포함해야 하며, 이 숫자가 홀수인지 짝수인지에 따라 각각 `"odd"` 또는 `"even"`을 반환합니다.

#### ✅ 구현 조건

**요청 형식**
- URL: `0.0.0.0:5678/api/v1/odd-or-even`
- method: `POST`
- Request Body: 숫자 정보가 포함
  - 구조
    ```json
      {
        "number": 3
      }
    ```

**응답 형식**
- 성공적인 요청의 경우
  - 서버는 JSON 형식으로 응답
  - 숫자가 홀수면 `{"result": "odd"}`, 짝수면 `{"result": "even"}` 반환

#### ✅ 요청 예시

```bash
curl -X POST "0.0.0.0:5678/api/v1/odd-or-even" \
-H 'Content-Type: application/json' \
-d '{"number": 3}'
```

#### ✅ 응답 예시

**POST 요청이 성공한 경우**
```json
{
  "result": "odd" // 짝수인 경우는 even
}
```

### 4번 문제. 숫자 합 반환하기

---

클라이언트가 보낸 두 숫자의 합을 반환하는 API를 구현합니다.


#### ✅ 구현 조건

**요청 형식**
- URL: `0.0.0.0:5678/api/v1/sum`
- method: `POST`
- Request Body: 두 개의 숫자 정보가 포함
  - 구조
    ```json
      {
        "number1": 3,
        "number2": 5
      }
    ```

**응답 형식**
- 성공적인 요청의 경우
  - 서버는 JSON 형식으로 응답
  - 두 숫자의 합을 `{"sum": <합계>}` 형태로 반환

#### ✅ 요청 예시

```bash
curl -X POST "0.0.0.0:5678/api/v1/sum" \
-H 'Content-Type: application/json' \
-d '{"number1": 5, "number2": 10}'
```

#### ✅ 응답 예시

**POST 요청이 성공한 경우**
```json
{
  "sum": 15
}
```

### 5번 문제. 서버 시간 반환

---

클라이언트가 요청을 보내면 서버는 현재 날짜 정보를 반환하여 응답하는 API를 구현합니다.


#### ✅ 구현 조건

**요청 형식**
- URL: `0.0.0.0:5678/api/v1/current-date`
- method: `GET`

**응답 형식**
- 성공적인 요청의 경우
  - 서버는 JSON 형식으로 응답
  - 서버의 현재 날짜에 대한 정보를 `{"current_date": "<현재 날짜>"}` 형식으로 반환
    - 이때 현재 날짜 형식은 `YYYY-MM-DD` 형식을 활용

#### ✅ 요청 예시

```bash
curl -X GET "0.0.0.0:5678/api/v1/current-date" \
-H 'Content-Type: application/json'
```

#### ✅ 응답 예시

**GET 요청이 성공한 경우**
```json
{
  "current_date": "2023-12-04"
}
```

### 6번 문제. 기본 POST 요청 처리

---

클라이언트가 POST 요청과 함께 `{"message": "your message"}` 형식의 JSON 데이터를 보내면, 서버는 동일한 메시지를 JSON 형식으로 응답해야 합니다.

#### ✅ 구현 조건

**요청 형식**
- URL: `0.0.0.0:5678/api/v1/echo`
- method: `POST`
- Request Body: 요청에 필요한 메시지 포함 (`"your message"` 부분에는 요청 메시지가 랜덤하게 포함)
  - 구조
    ```json
     {"message": "your message"}
    ```

**응답 형식**
- 성공적인 요청의 경우
  - 서버는 JSON 형식으로 응답
  - 요청 데이터와 동일한 JSON 데이터를 응답
    - 만약 `{"message": "your message222"}` 라는 메시지가 요청 본문에 포함되었다면 응답은 `{"message": "your message222"}` 으로 동일하게 진행

#### ✅ 요청 예시

```bash
curl -X POST 0.0.0.0:5678/api/v1/echo \
-H "Content-Type: application/json" \
-d '{"message": "Hello"}'
```

#### ✅ 응답 예시

**POST 요청이 성공한 경우**
```json
{
  "message": "Hello"
}
```

### 7번 문제. 블로그 게시글 개수 반환

---

블로그에 게재된 모든 게시글의 개수를 반환하는 API를 구현합니다. `posts.json` 데이터를 활용합니다.

#### ✅ 구현 조건 

**요청 형식**
- URL: `0.0.0.0:5678/api/v1/posts/count`
- method: `GET`

**응답 형식**
- 성공적인 요청의 경우
  - 서버는 JSON 형식으로 응답
  - 유저가 작성한 모든 블로그 게시글 수를 반환

#### ✅ 요청 예시

```json
curl -X GET "0.0.0.0:5678/api/v1/posts/count" \
-H 'Content-Type: application/json'
```

#### ✅ 응답 예시

```json
{
  "count": 150
}
```

### 8번 문제. 사용자 이메일 조회

---

특정 사용자 ID를 입력받아 해당 사용자의 이메일을 반환하는 API를 구현합니다. `users.json` 데이터를 활용합니다.


#### ✅ 구현 조건 

**요청 형식**
- URL: `0.0.0.0:5678/api/v1/user-email/{int:userId}`
- method: `GET`

**응답 형식**
- 성공적인 요청의 경우
  - 서버는 JSON 형식으로 응답
  - 응답 본문: 해당 사용자의 이메일 정보를 반환
- 문제가 있는 요청의 경우
  - 만약 해당 사용자가 없는 경우
    - 응답 상태 코드: `404`
    - `{"error": "User not found"}` 메시지 반환

#### ✅ 요청 예시

```json
curl -X GET "0.0.0.0:5678/api/v1/user-email/1" \
-H 'Content-Type: application/json'
```

#### ✅ 응답 예시

**정상적인 요청에 대한 응답**
```json
{
  "email": "user1@example.com"
}
```

**문제가 있는 경우 (존재하지 않는 유저 정보에 대한 요청)**
```json
{
  "error": "User not found" 
}
```

### 9번 문제. 사용자별 게시글 목록 조회

---

특정 사용자가 작성한 모든 게시글의 목록을 조회하는 API를 구현합니다. 이때 게시글 목록을 id를 기준으로 내림차순으로 정렬하여 반환합니다. 만약 해당 사용자가 게시글을 하나도 작성하지 않은 경우는 빈 배열을 반환합니다. `posts.json` 데이터를 활용합니다.

#### ✅ 구현 조건 

**요청 형식**
- URL: `0.0.0.0:5678/api/v1/user-posts/{int:userId}`
- method: `GET`

**응답 형식**
- 성공적인 요청의 경우
  - 서버는 JSON 형식으로 응답
  - 해당 사용자가 작성한 모든 게시글의 목록을 배열 형태로 반환
- 문제가 있는 요청의 경우
  - 만약 해당 사용자가 게시글을 작성하지 않은 경우
    - 응답 본문: 빈 배열(`[]`) 반환

#### ✅ 요청 예시

```json
curl -X GET "0.0.0.0:5678/api/v1/user-posts/1" \
-H 'Content-Type: application/json'
```

#### ✅ 응답 예시

**작성한 게시글이 있는 경우 (id를 기준으로 내림차순 반환)**
```json
[
  {
    "id": 10,
    "title": "Latest post",
    "content": "Content of the latest post"
  },
  {
    "id": 8,
    "title": "Latest post2",
    "content": "Content of the latest post2"
  },
  ...
]
```

**작성한 게시글이 없는 경우**
```json
[]
```

### 10번 문제. 게시글 수정하기

---

사용자가 작성한 특정 게시글의 제목과 내용을 수정하는 API를 구현합니다. 수정된 게시글의 정보는 제목(`title`)에 `" - updated"`를 추가하고 내용(`content`)에는 `" (Modified)"`를 추가하여 반영합니다. 그리고 수정된 게시글의 수정 날짜(`updated_at`)는 문제를 풀고 있는 시점의 날짜(`YYYY-MM-DD` 형식)로 설정합니다. `posts.json` 데이터를 활용합니다.

#### ✅ 구현 조건 

**요청 형식**
- URL: `0.0.0.0:5678/api/v1/posts/{int:postId}`
- method: `PUT`
- Request Body: 수정 할 게시글 데이터
  - 구조
    ```json
      {"title": "New Title", "content": "New content"}
    ```

**응답 형식**
- 성공적인 요청의 경우
  - 서버는 JSON 형식으로 응답
  - 수정된 게시글의 제목과 내용 반환 그리고 추가 데이터 반환
- 문제가 있는 요청의 경우
  - 게시글이 존재하지 않는 경우
    - 응답 상태 코드: `404`
    - `{"error": "Post not found"}` 메시지 반환 

#### ✅ 요청 예시

```json
curl -X PUT "0.0.0.0:5678/api/v1/posts/{postId}" \
-H 'Content-Type: application/json' \
-d '{"title": "New Title", "content": "New content"}'
```

#### ✅ 응답 예시

**정상적인 응답인 경우**

```json
{
  "id": 1,
  "title": "New Title - updated",
  "content": "New content (Modified)",
  "user_id": 287,
  "created_at": "2023-10-19",
  "updated_at": "YYYY-MM-DD" // 문제를 푸는 시점의 날짜
}
```

**게시글이 존재하지 않는 경우**

```json
{
  "error": "Post not found"
}
```

### 11번 문제. 댓글 삭제하기

사용자가 작성한 특정 댓글을 삭제하는 API를 구현합니다. 삭제 요청이 성공적으로 처리되면 삭제된 댓글의 ID와 `"Comment deleted successfully"` 라는 메시지를 반환합니다. `comments.json` 데이터를 활용합니다.

---

#### ✅ 구현 조건 

**요청 형식**
- URL: `0.0.0.0:5678/api/v1/comments/{int:commentId}`
- method: `DELETE`

**응답 형식**
- 성공적인 요청의 경우
  - 서버는 JSON 형식으로 응답
  - 삭제된 댓글의 ID와 삭제 성공 메시지 반환
- 문제가 있는 요청의 경우
  - 게시글이 존재하지 않는 경우
    - 응답 상태 코드: `404`
    - `{"error": "Comment not found"}` 메시지 반환 

#### ✅ 요청 예시

```json
curl -X DELETE "0.0.0.0:5678/api/v1/comments/{commentId}" \
-H 'Content-Type: application/json'
```

#### ✅ 응답 예시

**정상적인 응답인 경우**
```json
{
  "message": "Comment deleted successfully",
  "deleted_comment_id": 1
}
```

**문제가 있는 경우 (댓글이 존재하지 않는 경우)**
```json
{
  "error": "Comment not found"
}
```

### 12번 문제. 특정 사용자의 게시글 조회하기

특정 사용자가 작성한 모든 게시글을 조회하는 API를 구현합니다. 이 API는 주어진 사용자 ID에 따라 해당 사용자가 작성한 게시글들의 정보를 반환합니다. `users.json`와 `posts.json` 데이터를 활용합니다.

---

#### ✅ 구현 조건 

**요청 형식**
- URL: `0.0.0.0:5678/api/v1/users/{int:userId}/posts`
- method: `GET`

**응답 형식**
- 성공적인 요청의 경우
  - 서버는 JSON 형식으로 응답
  - 해당 사용자가 작성한 모든 게시글의 정보를 배열 형태로 반환
- 문제가 있는 요청의 경우
  - 사용자가 존재하지 않는 경우
    - 응답 상태 코드: `404`
    - `{"error": "User not found"}` 메시지 반환

#### ✅ 요청 예시

```json
curl -X GET "0.0.0.0:5678/api/v1/users/1/posts" \
-H 'Content-Type: application/json'
```

#### ✅ 응답 예시

**정상적인 응답인 경우**

```json
[
  {
    "id": 3,
    "title": "Example Post Title",
    "content": "This is an example post content.",
    "created_at": "2023-01-01"
  },
  ...
]
```

**문제가 있는 경우 (사용자가 존재하지 않는 경우)**

```json
{
  "error": "User not found"
}
```


### 13번 문제. 특정 게시글의 댓글 추가하기

사용자가 특정 게시글에 댓글을 추가하는 기능을 구현합니다. 댓글은 사용자 ID와 댓글 내용을 받아서 추가되며, 댓글의 `생성 날짜(created_at)`는 현재 문제를 풀고 있는 시점의 날짜(`YYYY-MM-DD` 형식)로 설정합니다. `users.json`와 `posts.json`, 그리고 `comments.json` 데이터를 활용합니다.

---

#### ✅ 구현 조건 

**요청 형식**
- URL: `0.0.0.0:5678/api/v1/posts/{int:postId}/comments`
- method: `POST`
- Request Body: 추가 할 댓글 데이터
  - 구조
    ```json
      {"user_id": 2, "content": "Good post!!!"}
    ```

**응답 형식**
- 성공적인 요청의 경우
  - 서버는 JSON 형식으로 응답
  - 생성된 댓글의 정보 반환
- 문제가 있는 요청의 경우
  - 게시글이나 사용자가 존재하지 않는 경우
    - 응답 상태 코드: `404`
    - `{"error": "Post or User not found"}` 메시지 반환
  - 사댓글 내용이 누락된 경우
    - 응답 상태 코드: `400`
    - `{"error": "Comment content is required"}` 메시지 반환

#### ✅ 요청 예시

```json
curl -X POST "0.0.0.0:5678/api/v1/posts/1/comments" \
-H 'Content-Type: application/json' \
-d '{"user_id": 2, "content": "Good post!!!"}'
```

#### ✅ 응답 예시

**정상적인 응답의 경우**

```json
{
  "id": 1,
  "post_id": 1,
  "user_id": 10,
  "content": "This is a comment",
  "created_at": "YYYY-MM-DD" // 문제를 푸는 시점의 날짜
}

```

**문제가 있는 경우 (게시글이나 사용자가 존재하지 않는 경우)**

```json
{
  "error": "Post or User not found"
}
```

**문제가 있는 경우 (댓글 내용이 누락된 경우)**

```json
{
  "error": "Comment content is required"
}
```

### 14번 문제. 사용자 활동 요약 데이터 반환

특정 사용자의 블로그 활동을 요약하는 보고서를 생성하는 API를 구현합니다. 이 보고서는 사용자의 게시글 및 댓글 활동을 기반으로 하며, 해당 사용자가 작성한 게시글과 댓글의 총 수, 최근 활동(게시글 및 댓글 작성) 날짜 및 그 내용을 포함합니다. `users.json`와 `posts.json`, 그리고 `comments.json` 데이터를 활용합니다. 

---

#### ✅ 구현 조건 

**요청 형식**
- URL: `0.0.0.0:5678/api/v1/users/{int:userId}/activity-report`
- method: `GET`

**응답 형식**
- 성공적인 요청의 경우
  - 서버는 JSON 형식으로 응답
  - 응답 본문: 사용자의 활동 요약 데이터 결과 반환
- 문제가 있는 요청의 경우
  - 사용자가 존재하지 않는 경우
    - 응답 상태 코드: `404`
    - `{"error": "User not found"}` 메시지 반환
  - 사용자의 활동이 없는 경우
    - 응답 상태 코드: `200`
    - `{"message": "No activity found"}` 메시지 반환

#### ✅ 요청 예시

```json
curl -X GET "0.0.0.0:5678/api/v1/users/{userId}/activity-report" \
-H 'Content-Type: application/json'
```

#### ✅ 응답 예시

**정상적인 응답인 경우**

```json
{
  "userId": 1,
  "totalPosts": 5,
  "totalComments": 10,
  "recentActivity": {
    "latestPost": {
      "postId": 12,
      "title": "Latest Post Title",
      "content": "Latest post content",
      "createdAt": "2023-12-10"
    },
    "latestComment": {
      "commentId": 45,
      "content": "Latest comment content",
      "createdAt": "2023-12-12"
    }
  }
}
```

**문제가 있는 경우 (사용자가 존재하지 않는 경우)**

```json
{
  "error": "User not found"
}
```

**문제가 있는 경우 (사용자의 활동이 없는 경우)**

```json
{
  "message": "No activity found"
}
```