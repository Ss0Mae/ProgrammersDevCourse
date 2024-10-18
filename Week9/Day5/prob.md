# 도서 정보 관리 API Server 구성

> 응시자는 아래의 요구사항에 맞는 응답을 처리하기 위한 API 서버를 완성해야 합니다. `채점하기` 버튼을 누르면 응시자가 구성한 서버로 요청을 보내 채점을 진행합니다. 각 문항별 `요청(Request)`은 채점코드가 요청하는 내용을 의미하고 `응답(Response)`는 응시자가 구현한 서버에서 응답하는 내용을 의미합니다. 지문에 있는 요청 예시 및 응답 예시는 실제 채점 케이스와는 다릅니다.

- 주소 : 모든 IP에서 접근할 수 있도록 0.0.0.0으로 실행합니다.
- 포트 : 5678을 사용하여 실행합니다.

localhost 혹은 127.0.0.1로 서버가 실행되거나 5678이외의 포트를 사용한다면 채점이 이루어지지 않습니다.

## 1. 문제 풀이의 기본 조건

> 정그렙은 신규 이벤트에 필요한 기능 제공하는 API Server 구현을 요청받았습니다. 요청 사항을 만족하는 API Server를 개발해주세요.

- 구현해야 하는 서버의 endpoint는 아래와 같습니다.
  ```
  - 0.0.0.0:5678
    - api/v1/server-health-check (예시 문제)
    - api/v1/yes-or-no
    - api/v1/random-number
    - api/v1/current-date
    - api/v1/validate-message
    - api/v1/books/count (예시 문제)
    - api/v1/users/count
    - api/v1/users/{int:userId}/books/count
    - api/v1/books/recent
    - api/v1/users/{int:userId}/due-date/total
    - api/v1/users/{int:userId}
    - api/v1/books/genre/{str:genre}
    - api/v1/books/genre-count?genre=<genre>
    - api/v1/users/{int:userId}/borrowed-books
  ```

- 조건에 맞는 요청과 응답을 처리하기 위해서는 프로젝트 환경에 제공된 데이터 활용이 필요합니다. 데이터 파일의 위치와 상세 정보는 아래와 같습니다.
  ```
  /project
    /data
      /input
        users.json
        books.json
        book_borrowings.json
  ```

  **users.json**
  | key     | type | 설명 | 비고  |
  | ------- | ---------- | -------- | -------- |
  | `id`      | integer    |    | PK | 
  | `username` | string    |  사용자의 아이디  | |
  | `password` | string     | 사용자의 비밀번호     | |
  | `created_at` | string     |   사용자의 계정이 생성된 일자      | `YYYY-MM-DD` 형식 |

  **books.json**
  | key     | type | 설명  | 비고 |
  | ------- | ---------- | -------- | -------- |
  | `id`      | integer    |    | PK | 
  | `title` | string    | 도서 제목  |  |
  | `author` | string     | 도서 저자  | |
  | `published_date` | string  |  도서 출판 날짜  | |
  | `genre` | string     | 도서 장르 | |

  **book_borrowings.json**
  | key     | type | 설명  | 비고 |
  | ------- | ---------- | -------- | -------- |
  | `id`      | integer    |    | PK | 
  | `book_id` | integer    | `Books` 테이블의 `id` 참조  | FK |
  | `user_id` | integer     | `Users` 테이블의 `id` 참조  | FK |
  | `borrowed_at` | string  |  대출 일자  | `YYYY-MM-DD` 형식 |
  | `dute_date` | string     | 반납 예정 일자 | `YYYY-MM-DD` 형식 |

## 2. API 개요
### 2.1. 공통 사항
별도의 언급이 없는 경우 아래 조건에 맞춰 응답을 처리합니다.
- API 서버의 정상 응답은 상태 코드 `200`을 포함하여 전송합니다.
- Header의 `Content-Type`을 `application/json`으로 설정하고 JSON 형식으로 응답합니다.

### 2.2. 응답 처리
- 본 문제는 실제 데이터베이스를 사용하지 않습니다. 
- 따라서 주어진 JSON 파일을 활용하여 데이터를 읽고 필요한 응답은 DB 혹은 파일 형태로 저장하지 않고 HTTP Response 형태로 반환해야합니다.

## 3. API 상세

### 1번 문제. 서버 헬스 체크 (예시 문제)

> 이 문제는 문제 풀이의 이해를 돕기 위한 예시 문제입니다. 이 문제의 솔루션 코드를 참고하여 다음 문제 풀이를 진행해주세요. 

---

클라이언트가 요청을 보내면 서버는 그 요청 메시지를 해석한 다음 적절한 결과물을 응답 메시지로 작성해서 돌려줘야 합니다. API 서버에서 요청이 성공적으로 처리되는지 확인하는 기능을 구현합니다.


#### ✅ 구현 조건

**요청 형식**
- URL: `0.0.0.0:5678/api/v1/server-health-check`
- method: `GET`

**응답 형식**
- 성공적인 요청의 경우
  - 서버는 JSON 형식으로 응답
  - `{"message": "server is running"}`

#### ✅ 요청 예시

```bash
curl -X GET "0.0.0.0:5678/api/v1/server-health-check" \
-H 'Content-Type: application/json'
```

#### ✅ 응답 예시

**GET 요청이 성공한 경우**
```json
{
  "message": "server is running"
}
```

### 2번 문제. Yes/No 반환하기

---

클라이언트로부터 GET 요청을 받으면 서버는 `{"response": "Yes"}` 또는 `{"response": "No"}`를 랜덤으로 반환합니다. "Yes" 혹은 "No" 어떤 것을 반환해도 상관없습니다.


#### ✅ 구현 조건

**요청 형식**
- URL: `0.0.0.0:5678/api/v1/yes-or-no`
- method: `GET`

**응답 형식**
- 성공적인 요청의 경우
  - 서버는 JSON 형식으로 응답
  - `{"response": "Yes"}` 또는 `{"response": "No"}`로 반환

#### ✅ 요청 예시

```bash
curl -X GET "0.0.0.0:5678/api/v1/yes-or-no" \
-H 'Content-Type: application/json'
```

#### ✅ 응답 예시

**GET 요청이 성공한 경우**
```json
{
  "response": "Yes" // 혹은 "No" 어떤 것을 응답해도 상관 없음
}
```

### 3번 문제. 숫자 반환하기

---

클라이언트로부터 GET 요청을 받으면 서버는 1에서 10 사이의 숫자를 랜덤으로 반환합니다. 숫자는 1에서 10 사이의 어느 숫자도 상관 없습니다.


#### ✅ 구현 조건

**요청 형식**
- URL: `0.0.0.0:5678/api/v1/random-number`
- method: `GET`

**응답 형식**
- 성공적인 요청의 경우
  - 서버는 JSON 형식으로 응답
  - 랜덤 숫자를 포함한 (`{"number": <number>}`) 형식을 응답

#### ✅ 요청 예시

```bash
curl -X GET "0.0.0.0:5678/api/v1/random-number" \
-H 'Content-Type: application/json'
```

#### ✅ 응답 예시

**GET 요청이 성공한 경우**
```json
{
  "number": 1 // 1에서 10 사이의 숫자 어떤 것이든 상관 없음
}
```

### 4번 문제. 날짜 반환하기

---

클라이언트로부터 요청을 받으면 서버는 현재 날짜(연/월/일) 를 `YYYY-MM-DD` 형식으로 반환합니다.


#### ✅ 구현 조건

**요청 형식**
- URL: `0.0.0.0:5678/api/v1/current-date`
- method: `GET`

**응답 형식**
- 성공적인 요청의 경우
  - 서버는 JSON 형식으로 응답
  - 현재 날짜를 (`{"date": "YYYY-MM-DD"}`) 형식으로 응답

#### ✅ 요청 예시

```bash
curl -X GET "0.0.0.0:5678/api/v1/current-date" \
-H 'Content-Type: application/json'
```

#### ✅ 응답 예시

**GET 요청이 성공한 경우**
```json
{
  "date": "2023-12-12" // 현재 날짜(YYYY-MM-DD 형식)
}
```

### 5번 문제. 메시지 데이터 요청에 대한 검증 및 처리

---

클라이언트가 요청을 보내면 서버는 그 요청 메시지를 해석한 다음 적절한 결과물을 응답 메시지로 작성해서 돌려줘야 합니다. API 서버에서 요청이 성공적으로 처리되는지 확인하는 기능을 구현합니다.

#### ✅ 구현 조건

**요청 형식**
- URL: `0.0.0.0:5678/api/v1/validate-message`
- method: `POST`
- Request Body: 사용자와 메시지 정보가 전달
  - 이때 `name`과 `message`에서 값(value)은 자유롭게 설정 가능
  - 구조
    ```json
      {"name": "john", "message": "hello world"}
    ```

**응답 형식**
- 성공적인 요청의 경우
  - 정상적인 데이터는 `name`과 `message`가 모두 포함된 형태
  - 응답 본문: `{"message": "data saved successfully"}` 

- 문제가 있는 요청의 경우
  - 필드 이름이 잘못 되거나, 둘 중 하나의 필드가 빠지거나, 두 필드가 모두 빠진 경우
  - 응답 상태 코드: `400`
  - 응답 본문: `{"error": "Invalid data format"}`

#### ✅ 요청 예시

```bash
curl -X POST "0.0.0.0:5678/api/v1/validate-message" \
-H 'Content-Type: application/json' \
-d '{
  "name": "john", 
  "message": "hello world"
  }'
```

#### ✅ 응답 예시

**POST 요청이 성공한 경우**
```json
{
  "message": "data saved successfully"
}
```

**POST 요청이 실패한 경우**
```json
{
  "error": "Invalid data format"
}
```

### 6번 문제. 도서 권수 카운트하기 (예시 문제)

> 이 문제는 문제 풀이의 이해를 돕기 위한 예시 문제입니다. 이 문제의 솔루션 코드를 참고하여 다음 문제 풀이를 진행해주세요. 

---

도서 데이터베이스에서 총 도서 권수를 카운트하는 API를 구현합니다. `books.json` 데이터를 활용합니다.

#### ✅ 구현 조건

**요청 형식**
- URL: `0.0.0.0:5678/api/v1/books/count`
- method: `GET`

**응답 형식**
- 성공적인 요청의 경우
  - 서버는 JSON 형식으로 응답
  - 전체 도서 권수 반환

#### ✅ 요청 예시

```json
curl -X GET "0.0.0.0:5678/api/v1/books/count" \
-H 'Content-Type: application/json'
```

#### ✅ 응답 예시

```json
{
  "count": 500
}
```

### 7번 문제. 사용자 계정 수 카운트하기

---

사용자 데이터베이스에서 총 사용자 계정의 수를 카운트하는 API를 구현합니다. `users.json` 데이터를 활용합니다.


#### ✅ 구현 조건

**요청 형식**
- URL: `0.0.0.0:5678/api/v1/users/count`
- method: `GET`

**응답 형식**
- 성공적인 요청의 경우
  - 서버는 JSON 형식으로 응답
  - 전체 사용자 계정수 반환

#### ✅ 요청 예시

```json
curl -X GET "0.0.0.0:5678/api/v1/users/count" \
-H 'Content-Type: application/json'
```

#### ✅ 응답 예시

```json
{
  "count": 150
}
```

### 8번 문제. 사용자 별 대출 도서 권수 조회

---

사용자별로 대출한 도서의 수를 카운트하는 API를 구현합니다. `users.json`에서 유효한 사용자 id를 확인하고, 해당 사용자의 대출 기록에 따라 도서 권수를 계산합니다. 대출 기록이 없는 사용자의 경우, 도서 권수는 0으로 계산합니다. `book_borrowings.json` 및 `users.json` 데이터를 활용합니다. 



#### ✅ 구현 조건

**요청 형식**
- URL: `0.0.0.0:5678/api/v1/users/{int:userId}/books/count`
- method: `GET`
- Path Parameter: 랜덤한 사용자의 id 값
  - `userId`는 항상 유효한(존재하는 유저) 아이디만 들어온다고 가정

**응답 형식**
- 성공적인 요청의 경우
  - 서버는 JSON 형식으로 응답
  - 해당 사용자가 대출한 도서의 수를 반환

#### ✅ 요청 예시

```json
curl -X GET "0.0.0.0:5678/api/v1/users/1/books/count" \
-H 'Content-Type: application/json'
```

#### ✅ 응답 예시

```json
{
  "userId": 1,
  "count": 3
}
```

### 9번 문제. 특정 시점 이후 출판된 도서 목록 조회

---

2001년 이후 출판된 도서 목록을 조회하는 API를 구현합니다. `books.json` 데이터를 활용합니다.


#### ✅ 구현 조건

**요청 형식**
- URL: `0.0.0.0:5678/api/v1/books/recent`
- method: `GET`

**응답 형식**
- 성공적인 요청의 경우
  - 서버는 JSON 형식으로 응답
  - 2001년 이후 출판된 도서의 목록을 배열 형태로 반환

#### ✅ 요청 예시

```json
curl -X GET "0.0.0.0:5678/api/v1/books/recent" \
-H 'Content-Type: application/json'
```

#### ✅ 응답 예시

```json
[
  {
    "id": 150,
    "title": "Recent Book 1",
    "author": "Author 1",
    "published_date": "2002-05-21",
    "genre": "Fiction"
  },
  ...
]
```

### 10번 문제. 특정 사용자가 대출한 도서의 총 반납 예정일 계산

---

특정 사용자가 대출한 도서들의 총 반납 예정일을 계산하는 API를 구현합니다. 이때 반납 예정일이 이미 지난 도서는 계산에서 제외합니다. 대출 기록이 없는 사용자의 경우 총 반납 예정일은 0일로 계산합니다. `book_borrowings.json` 과 `users.json` 데이터를 활용합니다.

반납 예정일 계산은 각 도서의 반납 예정일(due_date)에서 현재 날짜를 뺀 일수를 모두 합산합니다. 이미 지난 반납 예정일은 계산에서 제외합니다. 예를 들어, 오늘이 2023년 8월 1일이고 사용자가 반납 예정일이 2023년 8월 5일과 2023년 8월 10일인 두 권의 도서를 대출했다면 총 반납 예정일은 5일(8월 5일까지) + 9일(8월 10일까지) = 14일입니다.

#### ✅ 구현 조건

**요청 형식**
- URL: `0.0.0.0:5678/api/v1/users/{int:userId}/due-date/total`
- method: `GET`
- Path Parameter: 랜덤한 사용자의 id 값
  - `userId`는 유효하지 않은 사용자의 id 값이 넘어올 수도 있음

**응답 형식**
- 성공적인 요청의 경우
  - 서버는 JSON 형식으로 응답
  - 반납일이 아직 지나지 않은 도서들의 총 반납 예정일(일수)을 반환
- 문제가 있는 요청의 경우
  - 사용자 ID가 존재하지 않는 경우
    - 응답 상태 코드: `404`
    - 응답 본문: `{"error": "User not found"}`

#### ✅ 요청 예시

```json
curl -X GET "0.0.0.0:5678/api/v1/users/1/due-date/total" \
-H 'Content-Type: application/json'
```

#### ✅ 응답 예시

```json
{
  "userId": 1,
  "totalDueDays": 45
}
```

### 11번 문제. 사용자 상세 계정 조회

---

사용자 계정 정보를 조회하는 API를 구현합니다. 클라이언트는 사용자 ID를 제공하고, 서버는 해당 ID에 해당하는 사용자 정보를 반환합니다. `users.json` 데이터를 활용합니다.

#### ✅ 구현 조건

**요청 형식**
- URL: `0.0.0.0:5678/api/v1/users/{int:userId}`
- method: `GET`
- Path Parameter: 랜덤한 사용자의 id 값
  - `userId`는 유효하지 않은 사용자의 id 값이 넘어올 수도 있음

**응답 형식**
- 성공적인 요청의 경우
  - 서버는 JSON 형식으로 응답
  - 사용자 정보 반환
- 문제가 있는 요청의 경우
  - 사용자 ID가 존재하지 않는 경우
    - 응답 상태 코드: `404`
    - 응답 본문: `{"error": "User not found"}`

#### ✅ 요청 예시

```json
curl -X GET "0.0.0.0:5678/api/v1/users/1" \
-H 'Content-Type: application/json'
```

#### ✅ 응답 예시

**GET 요청이 성공한 경우 (사용자 ID: 1)**
```json
{
  "id": 1,
  "username": "stephanie63",
  "created_at": "2022-11-05"
}
```

**GET 요청이 실패한 경우 (사용자 ID가 존재하지 않음)**
```json
{
  "error": "User not found"
}
```

### 12번 문제. 특정 장르의 도서 목록 조회

---

특정 장르에 해당하는 도서 목록을 조회하는 API를 구현합니다. `books.json` 데이터를 활용합니다.

#### ✅ 구현 조건

**요청 형식**
- URL: `0.0.0.0:5678/api/v1/books/genre/{str:genre}`
- method: `GET`
- Path Parameter: genre에 해당하는 데이터
  - `genre`는 존재하지 않는 장르 데이터가 넘어올 수도 있음

**응답 형식**
- 성공적인 요청의 경우
  - 서버는 JSON 형식으로 응답
  - 해당 장르의 도서 목록을 배열 형태로 반환
- 문제가 있는 요청의 경우
  - 존재하지 않는 장르인 경우
    - 응답 상태 코드: `404`
    - 응답 본문: `{"error": "Genre not found"}`

#### ✅ 요청 예시
```json
curl -X GET "0.0.0.0:5678/api/v1/books/genre/Fiction" \
-H 'Content-Type: application/json'
```

#### ✅ 응답 예시 

**GET 요청이 성공한 경우 (장르가 Fiction인 경우)**
```json
[
  {
    "id": 1,
    "title": "Book Title 1",
    "author": "Author 1",
    "published_date": "2001-01-01",
    "genre": "Fiction"
  },
  // 다른 Fiction 장르 도서들...
  ...
]
```

**GET 요청이 성공한 경우 (존재하지 않는 장르)**
```json
{
  "error": "Genre not found"
}
```

### 13번 문제. 대출된 도서 중 특정 장르 도서의 수 카운트

---

대출된 도서 중에서 특정 장르에 속하는 도서의 수를 카운트하는 API를 구현합니다. 요청은 특정 장르를 포함하며 이 장르에 해당하는 대출된 도서의 수를 반환합니다. `book_borrowings.json`과 `books.json` 데이터를 활용합니다.


#### ✅ 구현 조건

**요청 형식**
- URL: `0.0.0.0:5678/api/v1/books/genre-count?genre=<genre>`
- method: `GET`
- Query Parameter: genre에 해당하는 데이터
    - `genre`는 존재하지 않는 장르 데이터가 넘어올 수도 있음
  
**응답 형식**
- 성공적인 요청의 경우
  - 서버는 JSON 형식으로 응답
  - 응답 본문: 해당 장르의 대출된 도서 수를 반환
- 문제가 있는 요청의 경우
  - 존재하지 않는 장르인 경우
    - 응답 상태 코드: `404`
    - 응답 본문: 빈 배열(`[]`)과 `"error": "Genre not found"` 메시지 반환

#### ✅ 요청 예시

```json
curl -X GET "0.0.0.0:5678/api/v1/books/genre-count?genre=Fiction" \
-H 'Content-Type: application/json'
```

#### ✅ 응답 예시

**정상적인 경우**
```json
{
  "genre": "Fiction",
  "count": 5
}
```

**문제가 있는 경우 (존재하지 않는 장르)**
```json
{
  "error": "Genre not found",
  "data": []
}
```

### 14번 문제. 사용자 별 도서 대출 정보 조회

---

사용자 ID를 기반으로 해당 사용자가 대출한 도서의 상세 정보를 조회하는 API를 구현합니다. `book_borrowings.json`, `users.json`, 그리고 `books.json` 데이터를 활용합니다.

#### ✅ 구현 조건

**요청 형식**
- URL: `0.0.0.0:5678/api/v1/users/{int:userId}/borrowed-books`
- method: `GET`
- Path Parameter: 랜덤한 사용자의 id 값
  - `userId`는 유효하지 않은 사용자의 id 값이 넘어올 수도 있음

**응답 형식**
- 성공적인 요청의 경우
  - 서버는 JSON 형식으로 응답
  - 응답 본문: 해당 사용자가 대출한 도서의 상세 정보(도서 ID, 제목, 저자, 출판 날짜, 장르) 반환
- 문제가 있는 요청의 경우
  - 해당 사용자가 대출한 도서가 없는 경우
    - 응답 상태 코드: `200`
    - 응답 본문: 빈 배열(`[]`) 반환
  - 사용자 ID가 존재하지 않는 경우
    - 응답 상태 코드: `404`
    - 응답 본문: `{"error": "User not found"}` 메시지 반환

#### ✅ 요청 예시

```json
curl -X GET "0.0.0.0:5678/api/v1/users/1/borrowed-books" \
-H 'Content-Type: application/json'
```

#### ✅ 응답 예시

**성공적인 요청**
```json
[
  {
    "bookId": 10,
    "title": "Book Title 10",
    "author": "Author 10",
    "publishedDate": "2010-01-01",
    "genre": "Fiction"
  },
  // 다른 대출 도서들...
  ...
]
```

**실패한 요청 (존재하지 않는 사용자 ID)**
```json
{
  "error": "User not found"
}
```