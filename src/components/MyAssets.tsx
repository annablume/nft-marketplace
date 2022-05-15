import { ethers } from "ethers";
import { getContract } from "../helper/contract";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";

export default function MyAssets() {
  const [nfts, setNfts] = useState<any[]>([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const router = useRouter();
  const web3reactContext = useWeb3React();

  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    const marketplaceContract = getContract(
      web3reactContext.library,
      web3reactContext.account
    );

    const data = await marketplaceContract.fetchMyNFTs();

    const items = await Promise.all(
      data.map(
        async (i: {
          tokenId: { toNumber: () => any };
          price: { toString: () => ethers.BigNumberish };
          seller: any;
          owner: any;
        }) => {
          const tokenURI = await marketplaceContract.tokenURI(i.tokenId);
          const meta = await axios.get(tokenURI);
          let price = ethers.utils.formatUnits(i.price.toString(), "ether");
          let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.data.nftFile,
            tokenURI,
          };
          return item;
        }
      )
    );
    setNfts(items);
    setLoadingState("loaded");
  }
  function listNFT(nft: any) {
    console.log("nft:", nft);
    router.push(`/resell-nft?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`);
  }
  if (loadingState == "loaded" && !nfts.length)
    return <h1 className="py-10 px-20 text-3xl">No NFTs owned</h1>;
  return (
    <div className="flex justify-center p-4">
      <div className="grid grid-cols-1 laptop:grid-cols-2 desktop:grid-cols-4 gap-4 pt-4">
        {nfts.map((nft: any, i) => (
          <div key={i} className="border shadow rounded-xl overflow-hidden">
            <Image
              className="rounded"
              src={nft.image}
              alt="NFT file"
              width={350}
              height={257}
              objectFit="cover"
              quality={100}
            />
            <div className="p-4 bg-black">
              <div className="flex gap-2 text-2xl font-bold text-white">
                Price - {nft.price}{" "}
                <Image
                  src="/Polygon-Matic-Logo.svg"
                  alt="Polygon Matic Logo"
                  width={25}
                  height={25}
                />
                MATIC
              </div>
              <button
                className="mt-4 w-full bg-pink-500 text-white font-bold py-2 px-12 rounded"
                onClick={() => listNFT(nft)}
              >
                List
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
