# Koropaganda v0.0.1
Koropaganda는 한국기술교육대학교의 학교 홍보 문구에서 영감을 받아 만들어진 난해한 프로그래밍 언어입니다.

![](https://user-images.githubusercontent.com/58779799/123730054-dc8da680-d8d0-11eb-83da-32d6e4ba4f27.jpg)

![](https://user-images.githubusercontent.com/58779799/123730074-e4e5e180-d8d0-11eb-936c-fbf734d9681d.jpg)

## 개요
Koropaganda는 네 개의 스택과 세 종류의 리터럴 그리고 세 개의 명령 구문을 제공합니다.

## 스택
- 스택의 모든 원소는 정수입니다. 자바스크립트로 구현된 인터프리터 기준 하한은 `Number.MIN_SAFE_INTEGER`, 상한은 `Number.MAX_SAFE_INTEGER`에 해당하는 값을 가집니다.
- `공기업` 스택은 표준 입력 스택으로 사용자의 입력이 들어갑니다. 유니코드 문자의 입력은 입력 순서대로 스택에 넣어지며, 해당 스택이 비었을 때 뽑기 연산이 일어날 경우 프로그램은 추가적인 입력을 받아 스택에 스택에 넣습니다.
- `중소기업` 스택은 명령 구문에서 사용되는 매개변수를 저장하는 스택입니다. 해당 스택이 비었을 때 뽑기 연산이 일어난 경우 인터프리터는 에러를 출력합니다.
- `중견기업` 스택은 사용자의 데이터를 저장하거나 출력할 요소를 저장하는데 사용되는 스택입니다.
- `대기업` 스택은 명령 구문의 연산 결과가 저장되는 스택입니다.

## 리터럴 
### 기본 리터럴
기본 리터럴은 KOREATECH 리터럴과 SKY 리터럴로 구분됩니다. 기본 리터럴은 후술할 명령 구문의 구성 요소로 사용됩니다.
- KOREATECH 리터럴
  - `KOREATECH`
  - `한국기술교육대학교`
  - `한기대`

상기된 세 개의 리터럴은 모두 동일한 지위를 가지며 상호변경하여 사용이 가능합니다. 예를들어 아래와 같이 작성된 세 구문은 모두 동치입니다.
```
한기대가 한기대했다!
한기대가 한국기술교육대학교했다!
KOREATECH이 KOREATECH했다!
```

- SKY 리터럴
  - `SKY`
  
### 취업 리터럴
취업 리터럴은 사용된 명령어에 따라서 다른 의미를 가집니다. 연산과 관련된 구문에서는 정수로서 사용되고 저장 및 출력과 관련된 구문에서는 해당하는 이름의 스택을 가리키는데 사용됩니다.

취업 리터럴 | 정수 | 스택
:---:|:---:|:---:
`공기업` | 0 | `공기업` 스택
`중소기업` | 1 | `중소기업` 스택
`중견기업` | 2 | `중견기업` 스택
`대기업` | 3 | `대기업` 스택


### 대학 리터럴
대학 리터럴은 명령 구문에서 음과 양의 부호를 결정하는데 사용됩니다.

대학 리터럴 | 부호
:---:|:---:
`대학` | +
`대학원` | -

## 명령어

### <`주석` 공시>
한 줄 주석 구문입니다. 주석 구문은 프로그램 실행에 아무런 영향을 주지 않으며 무시됩니다.

### `취업`보다 `기본`
`취업` 스택의 가장 마지막 두 요소를 비교 연산한 결과값을 대기업 스택에 넣습니다.
가장 마지막 요소가 크면 `1` 작으면 `0`을 `대기업` 스택에 넣습니다. 기본 리터럴은 무시됩니다.

### `SKY`보다 `KOREATECH`
`중소기업` 스택에 `1`을 넣습니다.

### `KOREATECH`보다 `SKY`
`중소기업` 스택에 `-1`을 넣습니다.

### `기본`보다 `기본`
`중소기업` 스택에 `0`을 넣습니다.

### `취업` 취업률 (`압도적`) `Y`위 (`Z`%)
`취업 * Y * Z%`를 올림한 정수값을 스택에 넣는 연산을 수행합니다. 괄호에 해당하는 부분은 생략할 수 있습니다.
`압도적` 키워드를 사용한 경우 결과값을 `대기업` 스택에 넣고, 사용하지 않은 경우 `중소기업` 스택에 넣습니다.
`Z`%가 사용되지 않은 경우, `Z`%는 100%로 평가됩니다.

```
중견기업 취업률 압도적 3위 40%
<2^3의 40%인 3.2를 올림한 4를 대기업 스택에 넣기 연산| 공시>
대기업 취업률 19위
<3*19를 중소기업 스택에 넣기 연산| 공시>
```

### `대학` 취업률 (압도적) Y위 (Z%)
`Y * Z%`를 올림한 정수값 개수 만큼의 요소를 뒤에서부터 전부 더한 값을 스택에 넣습니다. `압도적` 키워드를 사용한 경우 결과값을 `중소기업`스택에 넣고, 사용하지 않은 경우 `대기업` 스택에 넣습니다. `대학` 리터럴이 `대학원`인 경우 결과값의 부호는 음수입니다.
```
SKY보다 KOREATECH
SKY보다 KOREATECH
<중소기업 스택=[ 1, 1 ]| 공시>
대학 취업률 압도적 2위!
<1+1=2를 중소기업 스택에 넣기 연산| 공시>
<중소기업 스택=[ 1, 1, 2 ]| 공시>
대학원 취업률 3위!
<-(1+1+2)=-4)를 대기업 스택에 넣기 연산| 공시>
```

### `KOREATECH`이 `SKY`했다!
표준 출력으로 `중견기업` 스택의 마지막 요소를 꺼내어 유니코드 문자로 출력합니다. 출력된 요소는 `중견기업` 스택에서 삭제됩니다.

`중견기업` 스택이 [ 65 ]일 때의 사용 예:
```
한기대가 SKY했다!
```
표준 출력을 통해 'A'가 출력됩니다.

- `SKY`가 `KOREATECH`했다!
표준 에러로 `중견기업` 스택의 마지막 요소를 꺼내어 유니코드 문자로 출력합니다. 출력된 요소는 `중견기업` 스택에서 삭제됩니다.

`중견기업` 스택이 [ 97 ]일 때의 사용 예:
```
SKY가 한기대했다!
```
표준 에러를 통해 'a'가 출력됩니다.

### `KOREATECH`이 `KOREATECH`했다!
종료 코드 `0`으로 프로그램을 종료합니다.

### `SKY`가 `SKY`했다!
종료 코드 `1`로 프로그램을 종료합니다.

### `기본`이 `취업`했다!
`중소기업` 스택의 뒤에서 `취업+2`번째 요소가 `1`이면 뒤에서 `취업+1`번째 요소의 값 만큼 명령을 건너뜁니다. 마지막 직전 요소가 `1`이면 마지막 요소의 값만큼 명령을 건너뜁니다. 주석 또는 공백은 명령으로 평가되지 않습니다.  

```
 1 | SKY보다 KOREATECH
 2 | KOREATECH보다 SKY
 3 | KOREATECH보다 SKY
 4 | <2021년 교육부 대학 알리미| 공시>
 5 |
 6 | <중소기업 스택=[1, -1, -1]| 공시>
 7 | 한기대가 중소기업했다!
```
6번째 명령 구문이 실행될 때 `중소기업` 스택의 뒤에서 `취업+2`번째 요소가 1이고, 뒤에서 `취업+1`번째 요소가 -1이므로 다음에 실행될 명령은 3번줄의 `SKY보다 KOREATECH`가 됩니다.

### `취업`이 `기본`했다!
`취업` 스택의 가장 마지막 요소를 꺼내서 제거합니다.

### `취업`이 `취업`했다!
첫번째 `취업` 스택의 가장 마지막 요소를 꺼내서 두번째 `취업` 스택에 넣습니다.

## 예시
### SKY보다 KOREATECH
```
중소기업 취업률 72위
중소기업이 중견기업했다!
중소기업 취업률 67위
중소기업이 중견기업했다!
중소기업 취업률 69위
중소기업이 중견기업했다!
중소기업 취업률 84위
중소기업이 중견기업했다!
중소기업 취업률 65위
중소기업이 중견기업했다!
중소기업 취업률 69위
중소기업이 중견기업했다!
중소기업 취업률 82위
중소기업이 중견기업했다!
중소기업 취업률 79위
중소기업이 중견기업했다!
중소기업 취업률 75위
중소기업이 중견기업했다!
중소기업 취업률 32위
중소기업이 중견기업했다!

중견기업 취업률 압도적 17위 34.9%
중소기업 취업률 51위
대학 취업률 2위
중소기업이 한기대했다!
중소기업이 한기대했다!
대기업이 중견기업했다!

중견기업 취업률 압도적 17위 36.9%
중소기업 취업률 6위
대학 취업률 2위
중소기업이 한기대했다!
중소기업이 한기대했다!
대기업이 중견기업했다!

중소기업 취업률 89위
중소기업이 중견기업했다!
중소기업 취업률 75위
중소기업이 중견기업했다!
중소기업 취업률 83위
중소기업이 중견기업했다!
한기대보다 한기대
중소기업 취업률 14위
KOREATECH보다 KOREATECH
KOREATECH보다 KOREATECH
중소기업이 한기대했다!
중소기업이 한기대했다!
공기업보다 한기대
KOREATECH이 SKY했다!
한기대보다 SKY
대학 취업률 2위
중소기업이 한기대했다!
중소기업이 한기대했다!
대기업이 중소기업했다!
대기업이 중소기업했다!
중소기업 취업률 14위
대학원 취업률 1위
중소기업이 한기대했다!
대기업이 중소기업했다!
한기대가 공기업했다!
```

### 기타
 - Koropaganda Interpreter: [https://refracta.github.io/koropaganda/web/](https://refracta.github.io/koropaganda/web/)

## Contributor
- [refracta](https://github.com/refracta)
- [unta1337](https://github.com/unta1337)