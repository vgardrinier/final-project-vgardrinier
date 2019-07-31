var energyTrading = artifacts.require('EnergyTrading')
let catchRevert = require("./exceptionsHelpers.js").catchRevert
const BN = web3.utils.BN

contract('EnergyTrading', function(accounts) {

    const deployAccount = accounts[0]
    const firstAccount = accounts[3]
    const secondAccount = accounts[4]
    const thirdAccount = accounts[5]
    const alice = accounts[1]

    const energyUnitPrice = 150

    let instance

    const collective1 = {
        information: "Baker Street 100 - 107",
        totalHomes: 5
    }
    const collective2 = {
        information: "Jin Yang's street 34-36",
        totalHomes: 3
    }
    const collective3 = {
        information: "Lincoln Avenue West 1222 - 1229",
        totalHomes: 7
    }


    beforeEach(async () => {
        instance = await energyTrading.new()
    })

    describe("Setup", async() => {

        it("OWNER should be set to the deploying address", async() => {
            const owner = await instance.owner()
            assert.equal(owner, deployAccount, "the deploying address should be the owner")
        })
    })

    describe("Functions", () => {
      describe("addCollective()", async() =>{
          it("only the owner should be able to add a collective", async() => {
              await instance.addCollective(collective1.information, collective1.totalHomes, {from: deployAccount} )
              await catchRevert(instance.addCollective(collective1.information, collective1.totalHomes, {from: firstAccount}))
          })

          it("adding a collective should emit a collective with the provided collective details", async() => {
              const tx = await instance.addCollective(collective1.information, collective1.totalHomes, {from: deployAccount} )
              const collectiveData = tx.logs[0].args

              assert.equal(collectiveData.information, collective1.information, "the added collective descriptions should match")
              assert.equal(collectiveData.totalHomes.toString(10), collective1.totalHomes.toString(10), "the added collective totalHomes number should match")
          })
      })

      describe("readCollective()", async() =>{
        it("providing the collectiveId should return some information about the collective", async() =>{
          await instance.addCollective(collective1.information, collective1.totalHomes, {from: deployAccount} )
          const collectiveDetails = await instance.readCollective(0)

          assert.equal(collectiveDetails['0'], collective1.information, "the information details should match")
          assert.equal(collectiveDetails['1'].toString(10), collective1.totalHomes.toString(10), "the same number of tickets should be available")
          assert.equal(collectiveDetails['2'], true, "the collective should be open")
        })
      })

      it('Calling updateCollective(0, "Baker Street 100-107", 12) should set the first collective with those new details', async() => {
          let newtotalHomes = 12;
          let newInfo = "Baker Street 100 - 107";
          await instance.addCollective(collective1.information, collective1.totalHomes, {from: deployAccount} )
          await instance.updateCollective(0, newInfo, newtotalHomes)

          assert.equal(newInfo, collective1.information, "The returned value should equal the new value.")
      })
      // describe("buyTickets()", async() =>{
      //   it("energy units should only be able to be purchased when the collective is open", async() => {
      //       const energyUnits = 1

      //       // event w/ id 1 does not exist, therefore not open
      //       await catchRevert(instance.buyEnergy(1, energyUnits, {from: firstAccount, value: energyUnitPrice}))

      //       await instance.addCollective(collective1.information, collective1.totalHomes, {from: deployAccount} )
      //       await instance.buyTickets(0, energyUnits, {from: firstAccount, value: energyUnitPrice})

      //       const collectiveDetails = await instance.readCollective(0)
      //       assert.equal(collectiveDetails['1'].unitsPerUser[tx.origin], tot, `the ticket sales should be ${numberOfTickets}`)
      //   })


      // }


  })
    // it("should mark addresses as enrolled", async () => {
    //   //Let's enroll Alice.
    //   await instance.enroll({from: alice})

    //   const aliceEnrolled = await instance.enroll()
    //   // aliceEnrolled gives us a transaction object. console.log(aliceEnrolled) proves it
    //   //Then, I call the getter function wich returns a bool instead of a transaction object.
    //   //Alice's address is passed as a parameter and because we previously enrolled her. The return value is true, as expected:)
    //   const result = await instance.isenrolled(alice).call({ from: account })
    //   assert.equal(result, true, 'enroll balance is incorrect, check balance method or constructor')
    // });


})
