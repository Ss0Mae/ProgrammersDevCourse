# 브랜치 관련 학습 내용 정리

## 1. 브랜치 이름 규칙과 테스트

- **브랜치 이름**을 작성할 때의 규칙과 권장 사항에 대해 학습.
- 이름의 가독성, 일관성, 그리고 의미 전달의 중요성.
- 소문자와 하이픈 사용하기
- 기능 또는 이슈 중심의 이름, 접두사 사용하기, 간결하게 이름 만들기
- 브랜치 이름의 테스트 방법 및 실습.

## 2. 커밋 해야 그때 부터 브랜치!

- **브랜치 생성** 시점과 커밋의 관계.
- 커밋 후 브랜치를 생성하는 이유와 그에 따른 장점.

## 3. 원격 브랜치 실습

- 원격 리포지토리에서 **브랜치를 생성**하고 관리하는 방법 실습.
- 로컬 브랜치와 원격 브랜치의 차이점 이해.

## 4. 브랜치 전략, fast-forward

- **fast-forward 병합** 전략의 개념과 사용 사례.
- fast-forward 병합이 가능한 상황과 그렇지 않은 상황의 구분.

## 5. 브랜치 전략 3ways

- **3-way 병합**의 개념과 이를 사용하는 전략.
- 3-way 병합이 필요한 상황과 그 과정에서의 충돌 해결 방법.
- 두 브랜치가 분기한 상태에서 병합
- 병합시 베이스와 각 브랜치 2개가 참조하는 커밋을 기준으로 병합을 진행하기 때문

## 6. pull request & merge

- **Pull Request**를 사용하여 브랜치를 병합하는 과정.
- 협업 환경에서 Pull Request의 역할과 중요성.
- Merge 과정에서 고려해야 할 사항들.

## 7. merge된 깃허브 -> 깃에 동기화하기

- **깃허브와 로컬 리포지토리** 간의 동기화 과정.
- 병합된 깃허브 리포지토리를 로컬과 동기화하는 방법.

## 8. 충돌 해결하기

- **병합 충돌**이 발생하는 이유와 이를 해결하는 방법.
- 충돌 해결의 기본 원칙과 실습을 통한 문제 해결 방법 이해.

---

## 커밋 히스토리 및 병합 실습

| 커밋 별 파일내용 | GitFile1.txt | GitFile2.txt |
| --- | --- | --- |
| Commit4 | Contents3 | Contents1 |
| Commit3 | Contents3 | X |
| Commit2 | Contents2 | X |
| Commit1 | Contents1 | X |
- 로컬 GitDirectory1 폴더 생성함
- GitDirectory1 폴더를 로컬저장소로 만듦
- Commit1의 파일 상태가 되도록 작업하고 스테이징한 후 커밋함. 커밋
    
    메시지는 “Commit1"
    
- Commit2의 파일 상태가 되도록 작업하고 스테이징한 후 커밋함. 커밋
메시지는 “Commit2"
- Commit3의 파일 상태가 되도록 작업하고 스테이징한 후 커밋함. 커밋
메시지는 “Commit3"
- master 브랜치를 GitRepository1 원격저장소에 push함
- branch1 브랜치를 생성하고 체크아웃함
- Commit4의 파일 상태가 되도록 작업하고 스테이징한 후 커밋함. 커밋
메시지는 “Commit4"
- branch1 브랜치를 push함
- GitHub 사이트에서 master 브랜치를 기준으로 branch1를 병합하는 상황에
대한 pull request를 진행함. Pull request 제목은 PullRequests1, 내용은
PullRequestsContents1.
- 동일한 GitHub 계정으로 pull request를 승인함
- GitDirectory1 로컬저장소에서 모든 브랜치를 fetch함
- master 브랜치로 체크아웃한 후 master 브랜치를 pull함

---

![](https://velog.velcdn.com/images/ssomae/post/701b25af-1024-4371-a389-346ae86637a0/image.png)


![](https://velog.velcdn.com/images/ssomae/post/59225f80-b267-4aa5-8903-5a75db33964f/image.png)

---

### CLI history

![](https://velog.velcdn.com/images/ssomae/post/d2d87dd4-e987-425a-abb3-b0d2dd779fab/image.png)

---

### 커밋 히스토리

![](https://velog.velcdn.com/images/ssomae/post/aadb19df-4f00-4828-93f2-4b0ad6d85bb5/image.png)
