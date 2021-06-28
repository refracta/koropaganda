export default class Keywords {
    static SKY_ENG = 'SKY';

    static KOREATECH_ENG = 'KOREATECH';
    static KOREATECH_KOR_SHORT = '한기대';
    static KOREATECH_KOR_LONG = '한국기술교육대학교';
    static KOREATECH_CATEGORY = [this.KOREATECH_ENG, this.KOREATECH_KOR_SHORT, this.KOREATECH_KOR_LONG];
    static DEFAULT_CATEGORY = [this.SKY_ENG, ...this.KOREATECH_CATEGORY];

    static PUBLIC_COMPANY = '공기업';
    static SMALL_COMPANY = '중소기업';
    static MID_COMPANY = '중견기업';
    static LARGE_COMPANY = '대기업';
    static COMPANY_CATEGORY = [this.PUBLIC_COMPANY, this.SMALL_COMPANY, this.MID_COMPANY, this.LARGE_COMPANY];

    static UNIVERSITY = '대학';
    static GRADUATE_SCHOOL = '대학원';
    static SCHOOL_CATEGORY = [this.UNIVERSITY, this.GRADUATE_SCHOOL];

    static JOSA_GA_CATEGORY = [Keywords.SKY_ENG, Keywords.KOREATECH_KOR_SHORT, Keywords.KOREATECH_KOR_LONG];
}