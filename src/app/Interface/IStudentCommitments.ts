import { DATE_ONE, DATE_TWO, DATE_THREE, DATE_FOUR, AMOUNT_ONE, AMOUNT_TWO, AMOUNT_FOUR, AMOUNT_THREE, NOTE_ONE, NOTE_TWO, NOTE_THREE, NOTE_FOUR } from "../Classes/CommitmentVeriables";

export interface IStudentCommitments {
    id: string;
    semesterName: string;
    applicationId: string;
    commitment: string;
    remarks?: string;
    remarksByEmployeeId?: string;
    updatedDate?: string;
    duesUpToLastSemester: number;
    currentInstallment: number;
    totalPayable: number;
    paid: number;
    duesUpToMidOrFinalOrReg: number;
    remarksByEmployee?: any;
    [DATE_ONE]: Date;
    [DATE_TWO]?: Date;
    [DATE_THREE]?: Date;
    [DATE_FOUR]?: Date;
    [AMOUNT_ONE]: number;
    [AMOUNT_TWO]?: number;
    [AMOUNT_THREE]?: number;
    [AMOUNT_FOUR]?: number;
    [NOTE_ONE]: string;
    [NOTE_TWO]?: string;
    [NOTE_THREE]?: string;
    [NOTE_FOUR]?: string;
}


interface ICommitment{
    date: Date;
    amount: number;
    note?: string;
}

export interface IStudentCommitmentsView extends IStudentCommitments {
    commitments: ICommitment[]
}

export interface IStudentCommitmentsReport extends IStudentCommitments {
    semesterId: string;
    semesterName: string;
    programId: string;
    programName: string;
    applicationName: string;
    studentId: string;
}

export interface IStudentCommitmentsReportView extends IStudentCommitmentsReport,IStudentCommitmentsView { }