 /* var vs let vs const */
      function compareVariable() {
        let num1;
        const num2 = 30;
      }

      /*ID 란에 입력한 값을 팝업창에 띄우기*/
      function popId() {
        let userId = document.getElementById("txt_id").value;
        if (!userId) {
          alert("ID를 입력해 주세요");
        } else {
          alert(userId);
        }
      }

      /*나만의 함수 만들고, 버튼 클릭하면 호출하기*/
      function myFunction() {
        alert("1");
        alert("2");
        alert("3");
      }