## 백엔드가 어떤 구조를 갖추고 있을까?

![](https://velog.velcdn.com/images/ssomae/post/758d1241-4e3b-4872-bb00-da5093b106ae/image.png)

### 클라이언트

- 사용자 ⇒ 프론트엔드에게 요청

### 웹 서버

- **정적 페이지**에 대해 대응한다. (화면의 내용 / 데이터의 변화가 없는 것)
- **동적 페이지**에 대한 처리는 직접 처리하지 않고, 웹 어플리케이션 서버에게 전달한다. (데이터 처리/연산 을 통해 화면의 내용, 데이터가 변하는것)

---

## 백엔드 개발자는 API를 만든다.

### Application Programming Interface

- 라이브러리에 접근하기 위한 규칙들을 정의한 것
- 카카오맵, 네이버 지도, 개인 어플..
- 서울 교통공사 데이터베이스 ⇒ 개인

![](https://velog.velcdn.com/images/ssomae/post/5afdeb51-4474-446a-a364-2341b734eac8/image.png)


## REST API 와 그냥 API

- API: 데이터 아무렇게나 주면 되는것?, HTTP 형식을 따르지 않고, 끼워넣을 수 있음
- REST API: HTTP규약을 잘 따른 API
- RESTful API: HTTP 규약을 매우매우 잘따른 API

---

## HTTP 탬플릿 body에 담아야 할것들

- 전달해줄 데이터/ 화면 / …
- **이 데이터 좀 줄래? +”목적”**
    - URL을 통해 웹페이지의 주소 뿐만 아니라, **데이터 연산을 해달라고 서버에 요청**을 보낼수 도 있다.
    - http://localhost:8888 / 전체 상품 조회, 상품 등록…

---

## REST API URL 규칙

- 대문자 X, 소문자 O
- 언더바 X, 하이픈 O
- 마지막에 / 포함 X
- 행위를 포함하지 않는다 = 목적을 포함하지 안는다.
- 복수형을 쓴다

## URL + method 연습하기

```jsx
http://localhost:8888/post_product - 상품 등록
http://localhost:8888/select_all_products - 전체 상품 조회
http://localhost:8888/DeleteAllProducts - 모든 상품 삭제
/*
<REST API URL 규칙>
 대문자 X, 소문자 O
 언더바 X, 하이픈 O
 마지막에 / 포함 X
 행위를 포함하지 않는다 = 목적을 포함하지 안는다.
 복수형을 쓴다
 */
 /*메소드화 할수 있는것들은 분리해본다.*/
http://localhost:8888/"POST"/product- 상품 등록
http://localhost:8888/"GET"/products - 전체 상품 조회
http://localhost:8888/"DELETE"/product - 모든 상품 삭제
```