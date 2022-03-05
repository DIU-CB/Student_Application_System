import { IStudentCommitmentsReport, IStudentCommitments } from "src/app/Interface/IStudentCommitments";

export const CommitmentListFromRow = (element: IStudentCommitments)=>{
    let newData = [];
      if (element.dateOne && element.amountOne) {
        newData[0] = {date: element.dateOne, amount: element.amountOne, note: element.noteOne}
      }
      
      if (element.dateTwo && element.amountTwo) {
        newData[1] = {date: element.dateTwo, amount: element.amountTwo, note: element.noteTwo}
      }
      
      if (element.dateThree && element.amountThree) {
        newData[2] = {date: element.dateThree, amount: element.amountThree, note: element.noteThree}
      }
      
      if (element.dateFour && element.amountFour) {
        newData[3] = {date: element.dateFour, amount: element.amountFour, note: element.noteFour}
      }
      return newData;
}

export const CommitmentMap = (resp:IStudentCommitmentsReport[])=>{
    for (let i = 0; i < resp.length; i++) {
      const element = resp[i];
      
      resp[i]['commitments'] = CommitmentListFromRow(element);
    }

    return resp;
  }