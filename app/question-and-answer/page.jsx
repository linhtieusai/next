const MyPage = ({ params })  => {
  //const { data: session, status } = useSession();

    return (
      <>
        <br/>
        <br/>
        <div class="h-[100vh] overflow-auto pb-[200px] text-sm text-slate-850">
            <h1 className="text-lg font-bold">Frequently Asked Questions</h1>
            <h3 className="font-bold">1. Is There A Limit On How Many People I Can Refer?</h3>
            <p>There Is No Limit On How Many Referrals You Can Make. If You Feel That Several People Are Qualified For A Posted Job, You Can Refer All Of Them And Will Be Rewarded For Each Hired Candidate.</p>
            <h3 className="font-bold">2. What Would ViecThom Do If Many People Refer The Same Candidate At A Time?</h3>
            <p>When You Refer A Candidate, They Will Receive An Email That Tells Them About The Referral And Requires Their Verification Of Acceptance. They Are Eligible To Select Just One And Only Referrer Who Will Be Rewarded On Successful Hire.</p>
            <h3 className="font-bold">3. How To Ensure That The Candidate Is Not Duplicated?</h3>
            <p>Once The Candidate Click “Accept” The Referral, Other Referrers Will Not Be Able To Submit That Candidate. When They Try To Do That, The System Will Notify That This Candidate Was Referred By Another Referrer.</p>
            <h3 className="font-bold">4. How To Track The Recruitment Status?</h3>
            <p>All Information Between The Employer And The Referrer Should Take Place On ViecThom Platform. Each Side Needs To Update The Recruitment Status On The System Which Will Send Email Notifications To The Other One. In Addition, The Referrer Needs To Follow Up Closely With The Candidate Throughout The Hiring Process.</p>
            <h3 className="font-bold">5. How Do I Know Whether A Profile I Have Referred Is Hired?</h3>
            <p>In Addition To Receiving Updates On The System From The Employer, It Is Necessary That The Referrer Keeps In Touch With The Candidate To Track The Current Status. If The Referrer Detects Any Inappropriate Actions, Please Send A Notice To ViecThom For Investigation And Verification.</p>
            <h3 className="font-bold">6. What To Do If The Candidate Is Rejected After The Interview, But Then The Company Re-Hires?</h3>
            <p>Based On The Information Provided By The Referrer And The Company, ViecThom Will Verify The Information. If The Candidate Is Rejected And Then Re-Hired Within 12 Months, ViecThom Will Claim The Bonus From The Company To Reward The Referrer.</p>
            <h3 className="font-bold">7. What Is The Guarantee Terms Of Receiving Rewards?</h3>
            <div class="ss__frequently-list-item-content">When you refer a candidate successfully (that means, the candidate accepts to work for the Company), you will receive the referral bonus in 3 stages:
              <ul>
                  <li>- The first 25% Referral Bonus Will Be Paid After The Candidate Finishes the First 15 Days.</li>
                  <li>- The second 25% Referral Bonus Will Be Paid After The Candidate Finishes the first month.</li>
                  <li>- The last 50% Referral Bonus Will Be Paid After The Company Signs An Official Contract With The Candidate.</li>
              </ul>
              <br/>
              ViecThom will compile your income statement and pay it on the 5th and 20th of every month. The payment amount will be the sum of your successful transactions from the reporting date back to the previous "summary date". The actual amount received will be deducted 10% of the PIT (Personal Income Tax).
          </div>
            
        
        </div>
      </>
    );
};

export default MyPage;