import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { Bill, Counter, Legislator, Vote, VoteResult } from "./interfaces";

function Home() {
  const [legislators, setLegislators] = useState<Legislator[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);

  useEffect(() => {
    const loadPage = async () => {
      const getDataCSV = async (filename: string) => {
        const decoder = new TextDecoder("utf-8");
        const response = await fetch(`/data/${filename}.csv`);
        const reader = response.body?.getReader();
        const data = await reader?.read();
        const file = decoder.decode(data?.value);
        return Papa.parse(file, { header: true }).data;
      };

      let legislators: Legislator[] = (await getDataCSV(
        "legislators",
      )) as Legislator[];
      let bills: Bill[] = (await getDataCSV("bills")) as Bill[];
      let voteResults: VoteResult[] = (await getDataCSV(
        "vote_results",
      )) as VoteResult[];
      let votes: Vote[] = (await getDataCSV("votes")) as Vote[];

      let supportedLegislators: Counter = {};
      let opposedLegislators: Counter = {};
      let supportedBill: Counter = {};
      let opposedBill: Counter = {};

      voteResults.forEach((vote) => {
        if (vote.vote_type === "1") {
          supportedLegislators[vote.legislator_id] = supportedLegislators[
            vote.legislator_id
          ]
            ? supportedLegislators[vote.legislator_id] + 1
            : 1;
          supportedBill[vote.vote_id] = supportedBill[vote.vote_id]
            ? supportedBill[vote.vote_id] + 1
            : 1;
        } else if (vote.vote_type === "2") {
          opposedLegislators[vote.legislator_id] = opposedLegislators[
            vote.legislator_id
          ]
            ? opposedLegislators[vote.legislator_id] + 1
            : 1;
          opposedBill[vote.vote_id] = opposedBill[vote.vote_id]
            ? opposedBill[vote.vote_id] + 1
            : 1;
        }
      });

      legislators.forEach((leg) => {
        leg.supported = supportedLegislators[leg.id] || 0;
        leg.opposed = opposedLegislators[leg.id] || 0;
      });

      bills.forEach((bill) => {
        bill.sponsor = legislators.find((leg) => leg.id === bill.sponsor_id);
        bill.vote = votes.find((vote) => vote.bill_id === bill.id);
        if (bill.vote) {
          bill.supported = supportedBill[bill.vote.id];
          bill.opposed = opposedBill[bill.vote.id];
        }
      });

      setLegislators(legislators);
      setBills(bills);
    };
    loadPage();
  }, []);

  return (
    <div className="flex">
      <div className="px-4 pt-3">
        <h3 className="text-light">Legislators</h3>
        <table className="table table-hover table-dark table-bordered">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Legislator</th>
              <th scope="col">Supported bills</th>
              <th scope="col">Opposed bills</th>
            </tr>
          </thead>
          <tbody>
            {legislators.map((leg, index) => (
              <tr key={index}>
                <td>{leg.id}</td>
                <td>{leg.name}</td>
                <td>{leg.supported.toString()}</td>
                <td>{leg.opposed.toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4">
        <h3 className="text-light">Bills</h3>
        <table className="table table-hover table-dark table-bordered">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Bill</th>
              <th scope="col">Supporters</th>
              <th scope="col">Opposers</th>
              <th scope="col">Primary Sponsor</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill, index) => (
              <tr key={index}>
                <td>{bill.id}</td>
                <td>{bill.title}</td>
                <td>{bill.supported.toString()}</td>
                <td>{bill.opposed.toString()}</td>
                <td>{bill.sponsor?.name || "--"}</td>

                <td>{bill.opposed.toString()}</td>
                <td>{bill.sponsor?.name || "--"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
