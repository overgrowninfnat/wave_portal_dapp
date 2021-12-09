const main = async () => {
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal')
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther('0.1')
    });
    await waveContract.deployed();
    console.log("contract deployed at: ", waveContract.address)

    let contractBalance = await hre.ethers.provider.getBalance(
        waveContract.address
    )
    console.log('Contract balance: ', hre.ethers.utils.formatEther(contractBalance))

    let waveTxn = await waveContract.wave("My first message!");
    await waveTxn.wait();

    waveTxn = await waveContract.wave("My second message!");
    await waveTxn.wait();

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
        'Contract balance:',
        hre.ethers.utils.formatEther(contractBalance)
    );

    const [_, randomPerson] = await hre.ethers.getSigners();
    waveTxn = await waveContract.connect(randomPerson).wave("My second message");
    await waveTxn.wait()

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log('Contract balance: ', hre.ethers.utils.formatEther((contractBalance)));
}

const runMain = async () => {
    try{
      await main();
      process.exit(0)
    }catch(e){
        console.log(e);
        process.exit(1)
    }
};

runMain();