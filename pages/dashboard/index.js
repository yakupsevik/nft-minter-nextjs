/* ______________________________________________ */

//* Imports

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import Moralis from "moralis";
import Web3 from "web3";
import { contractABI, contractAddress } from "../../contracts/contract";
const web3 = new Web3(Web3.givenProvider);

/* ______________________________________________ */

function Dashboard() {

  /* ______________________________________________ */

  const { isAuthenticated, logout, user } = useMoralis();
  const router = useRouter();

  // * States
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  /* ______________________________________________ */

  // * Logout Function
  const logoutFunc = () => {
    localStorage.setItem("metamask_status", false);
    logout();
  }

  /* ______________________________________________ */

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("metamask_status", false)
      router.push("/");
    }
  }, [isAuthenticated]);

  /* ______________________________________________ */

  // * Form On Submit

  const onSubmit = async (e) => {
    e.preventDefault();

    // * return alert If inputs are blank
    if (name === "" && description === "" && file === null) {
      return alert("Inputs cannot be blank!");
    }

    try {

      // * Save image to IPFS
      const file1 = new Moralis.File(file.name, file);
      await file1.saveIPFS();
      const file1url = file1.ipfs();

      // * Generate metadata and save to ipfs
      const metadata = {
        name,
        description,
        image: file1url,
      };

      const file2 = new Moralis.File(`${name}metadata.json`, {
        base64: Buffer.from(JSON.stringify(metadata)).toString("base64"),
      });

      await file2.saveIPFS();
      const metadataurl = file2.ipfs();

      // * Interact with smart contract
      const contract = new web3.eth.Contract(contractABI, contractAddress)

      const response = await contract.methods
        .mint(metadataurl)
        .send({
          from: user.get("ethAddress"),
          value: web3.utils.toWei("5", "ether"),
          gas: 1500000,
          gasLimit: 3000000
        });

      alert(
        `NFT successfully minted. Contract address - https://testnet.bscscan.com/tx/${response.transactionHash}`
      );
    } catch (err) {
      alert("Something went wrong!");
    }
  };

  /* ______________________________________________ */

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="buttons">
          <button
            type="submit"
          >
            Mint now!
          </button>
          <button
            onClick={logoutFunc}
          >
            Logout
          </button>
        </div>
      </form>
    </>
  );
}

/* ______________________________________________ */

export default Dashboard;