const { AuthenticationError } = require('apollo-server-express');
const { Trucking_User, Dock_User, Load, Load_Test } = require('../models');
const { findById } = require('../models/Dock_User');
const { signTokenTrucker, signTokenDock } = require('../utils/auth');
const { resolvers: scalarResolvers } = require('graphql-scalars');
const { ScalarNameResolver } = require('graphql-scalars');
// import {GraphQLList} from 'graphql'

const resolvers = {

  // ScalarName: ScalarNameResolver,
    // Test1 : new GraphQLObjectType({
    //   name: "test",
    //   args: {
    //     containsId: new GraphQLList(GraphQLID)
    //   },
    // }),
    Query: {
        truckingUser: async (parent, args, context) => {
            if (context.user) {
              const truckingUser = await Trucking_User.findById(context.user._id)
              // .populate({
              //   path: 'orders.products',
              //   populate: 'category'
              // });
      
            //   truckingUser.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
      
              return truckingUser;
            }
      
            throw new AuthenticationError('Not logged in');
          },
          dockUser: async (parent, args, context) => {
            if (context.user) {
              const dockUser = await Dock_User.findById(context.user._id)
              // .populate({
              //   path: 'orders.products',
              //   populate: 'category'
              // });
      
            //   truckingUser.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
      
              return dockUser;
            }
      
            throw new AuthenticationError('Not logged in');
          },
          dockUser2: async () => {
            return await Dock_User.find({})
          },
          truckingUsers: async () => {
            return await Trucking_User.find({})
          },
          loads: async (context) => {
          //  let load
          console.log("context here is:", context)
            if (context.user.name === "test_dock" || context.user.name === "test_trucker" ){
             let load = await Load_Test.find({})
             return load
            } else {
            let load = await Load.find({})
             return load
          }
            // console.log("all loads is :", load)

          },
          me: async (parent, args, context) => {
            userId = context.user
            console.log("user id in resolvers is :", userId)
            const checkTruck = await Trucking_User.findById(  userId  )
            console.log("check Truck is:", checkTruck)
            const checkDock = await Dock_User.findById( userId)
            console.log("check Dock is:", checkDock)
            let docker, trucker
            if (checkTruck) {
              trucker = true
            } else {
              trucker = false
            }
            if (checkDock) {
              docker = true
            } else {
              docker = false
            }
            // if (checkTruck) {
            //   return true
            // } else return false
            return {docker,trucker}
          },   
          trucker_Id : async (parent, args, context) => {
            let truck = context.user._id
            console.log("trucker id is :", truck)
          return {truck}
          },
          getLoad: async (parent, args, context) => {
            // let loadIs = args.TheLoad
          //  let TheLoad =  await Load.findById( args.this)
            // console.log("the load is:", loadIs)
            if (context.user.name === "test_dock" || context.user.name === "test_trucker"){

              const {_id} = args._id
              const ObjectId = require('mongodb').ObjectID
              let _idObject = ObjectId(args._id)
              let test = []
              console.log("args length is:", args._id.length)
              for (let i = 0; i < args._id.length; i ++ ) {
                test.push(Load_Test.findById(args._id[i]))
              }
              let test2 = await Load_Test.findById(args._id)
              // return await Load.findById(args.loadId)
              console.log("long array is:", test)
              let test3 = await Load_Test.findById(args._id)
              // return test.list()
              return test3

            } else {
              const {_id} = args._id
              const ObjectId = require('mongodb').ObjectID
              let _idObject = ObjectId(args._id)
              let test = []
              console.log("args length is:", args._id.length)
              for (let i = 0; i < args._id.length; i ++ ) {
                test.push(Load.findById(args._id[i]))
              }
              let test2 = await Load.findById(args._id)
              // return await Load.findById(args.loadId)
              console.log("long array is:", test)
              let test3 = await Load.findById(args._id)
              // return test.list()
              return test3


            }

          },
          getTruckerLoads: async (parent, args, context) => {
            // console.log("context user for get trucker loads is:", context.user)
            if (context.user.name === "test_dock" || context.user.name === "test_trucker"){
              let test =  await Trucking_User.findById(context.user._id)
              console.log("trucking user data is:", test)
              // console.log("load is in state:", test.loads[2])
              // console.log("list before emptying is this:", list)
              let list = []
              console.log("cleared list is this:", list)
              // console.log("the load at i is:", test.loads[1])
              console.log("length of loads list is this", test.loads.length)
  
              for ( let i = 0 ; i < test.loads.length; i ++ ) {
                
                list.push(await Load_Test.findById(test.loads[i]))
                // console.log("load in for loop  is", test.loads[i])
              }
              console.log("load list is this:", list)
              return list
            } else {
              let test =  await Trucking_User.findById(context.user._id)
              console.log("trucking user data is:", test)
              // console.log("load is in state:", test.loads[2])
              // console.log("list before emptying is this:", list)
              let list = []
              console.log("cleared list is this:", list)
              // console.log("the load at i is:", test.loads[1])
              console.log("length of loads list is this", test.loads.length)
  
              for ( let i = 0 ; i < test.loads.length; i ++ ) {
                
                list.push(await Load.findById(test.loads[i]))
                // console.log("load in for loop  is", test.loads[i])
              }
              console.log("load list is this:", list)
              return list

            }

          },
          getLoads: async (parent, args, context) => {
            let loads = await Load.find({})
            console.log("loads is :", loads)
            return loads
          }
          // loadsInAState : async (parent, args, context) => {
          //   console.log("hello")
          //   let state_US = args.state
          //   let allLoads =  await Load.find({})
          //   console.log("all loads length is:", allLoads)
          //   let us_State_Array = [["Alabama", "AL"],["Alaska", "AK"],["Arizona", "AZ"],
          //   ["Arkansas", "AR"],["California", "CA"],["Colorado", "CO"],["Connecticut", "CT"],
          //   ["Delaware", "DE"],["Florida", "FL"],["Georgia", "GA"],["Hawaii", "HI"],
          //   ["Idaho", "ID"],["Illinois", "IL"],["Indiana", "IN"],["Iowa", "IA"],
          //   ["Kansas", "KS"],["Kentucky", "KY"],["Louisiana", "LA"],["Maine", "ME"],
          //   ["Maryland", "MD"],["Massachusetts", "MA"],["Michigan", "MI"],["Minnesota", "MN"]
          //   ,["Mississippi", "MS"],["Missouri", "MO"],["Montana", "MT"],["Nebraska", "NE"],["Nevada", "NV"]
          //   ,["New Hampshire", "NH"],["New Jersey", "NJ"],["New Mexico", "NM"],["New York", "NY"],["North Carolina", "NC"],
          //   ,["North Dakota", "ND"],["Ohio", "OH"],["Oklahoma", "OK"],["Oregon", "OR"],["Pennsylvania", "PA"]
          //   ,["Rhode Island", "RI"],["South Carolina", "SC"],["South Dakota", "SD"],["Tennessee", "TN"],["Texas", "TX"],["Utah", "UT"]
          //   ,["Vermont", "VT"],["Virginia", "VA"],["Washington", "WA"],["West Virginia", "WV"],["Wisconsin", "WI"]
          //   ,["Wyoming", "WY"]]
          //     let newStateArray = []
          //   for ( let i = 0 ; i < allLoads.length; i ++ ) {
          //     if (allLoads[i].state === state_US) {
          //         newStateArray.push(allLoads[i].state)
          //     }
          //   }
          //   console.log("new state array is:", newStateArray)

          // }
          },
    
       
    Mutation: {
        addTruckingUser: async (parent, args) => {
            const truckingUser = await Trucking_User.create(args);
            const token = signTokenTrucker(truckingUser);
      
            return { token, truckingUser };
          },
          removeLoadFromTruck: async (parent, args) => {
            await Trucking_User.findByIdAndUpdate(
                
              { _id: args.truckerId },
              { $pull: { loads: { _id: args.loadId } } },
              { new: true, upsert: true }
              
            )
          },
          addDockUser: async (parent, args) => {
            const dockUser = await Dock_User.create(args);
            const token = signTokenDock(dockUser);
      
            return { token, dockUser };
          },
          getLoad2: async (parent, args, context) => {
            // let loadIs = args.TheLoad
          //  let TheLoad =  await Load.findById( args.this)
            // console.log("the load is:", loadIs)
            return await Load.findById(args.loadId)
          },
          addLoad: async (parent, args, context) => {
            if (context.user.name === "test_dock" || context.user.name === "test_trucker"){
            // console.log("context is :", context)
            const loadOne = await Load_Test.create(args);
            // console.log("load one is:", loadOne)
            // let loadAdded =   await Load.findById()
            console.log("context from load is:", context.user._id)
            console.log("load one is again:", loadOne)
            // await Dock_User.findByIdAndUpdate(
            //   {_id: args.dock},
            //   { $addToSet: {loads: {_id: loadOne._id}}},
            //   {new: true, upsert: true}
            // // }
            // )

            await Trucking_User.findByIdAndUpdate(
              {_id: context.user._id},
              { $addToSet: { loads: {_id: loadOne._id}}},
              {new: true, upsert: true}
            )
            // const token = signToken(dockUser);
      
            return { _id: loadOne._id };            
            } else {
            // console.log("context is :", context)
            const loadOne = await Load.create(args);
            // console.log("load one is:", loadOne)
            // let loadAdded =   await Load.findById()
            console.log("context from load is:", context.user._id)
            console.log("load one is again:", loadOne)
            // await Dock_User.findByIdAndUpdate(
            //   {_id: args.dock},
            //   { $addToSet: {loads: {_id: loadOne._id}}},
            //   {new: true, upsert: true}
            // // }
            // )

            await Trucking_User.findByIdAndUpdate(
              {_id: context.user._id},
              { $addToSet: { loads: {_id: loadOne._id}}},
              {new: true, upsert: true}
            )
            // const token = signToken(dockUser);
      
            return { _id: loadOne._id };
            }

          },
          updateLoad: async (parent, args, context) => {
            if (context.user.name === "test_dock" || context.user.name === "test_trucker"){
              console.log("update load context user is :", context.user)
              // if (context.user) {
                await Load_Test.findByIdAndUpdate({_id: args.LoadId},args, { new: true });
              // }
              return {_id: args.LoadId}            
            } else {
              console.log("update load context user is :", context.user)
              // if (context.user) {
                await Load.findByIdAndUpdate({_id: args.LoadId},args, { new: true });
              // }
              return {_id: args.LoadId}
            }

          },
          addLoadToDock: async (parent, args, context) => {
            if (context.user) {
              console.log("context.user is:", context.user )
              console.log("args is :", args.loadAdded)
              return await Dock_User.findByIdAndUpdate(context.user,  { $addToSet: {loads: {_id: args.loadAdded}}},   {new: true, upsert: true} )
            }
          
          },
          addLoadToTrucker: async (parent, args, context) => {
            if (context.user) {
              console.log("context.user is:", context.user )
              console.log("args is :", args.loadAdded)
              return await Trucking_User.findByIdAndUpdate(context.user,  { $addToSet: {loads: {_id: args.loadAdded}}} )
            }
          
          },
          removeLoad: async (parent, args, context) => {
            if (context.user.name === "test_dock" || context.user.name === "test_trucker"){
              const ObjectId = require('mongodb').ObjectID
              console.log("load removed is :", args.loadRemoved)
              let load1 = Load_Test.findById(args.loadRemoved)

            //  await Trucking_User.findByIdAndUpdate( "607f81e9c8bb1c7408eba11c"  , {$pull: {loads: {_id:  "611f2411bf291f612cb49eab"}}}  ,      { safe: true })
            //  await Trucking_User.updateMany({_id:"607f81e9c8bb1c7408eba11c"},{$pull:{loads: {$in: [ObjectId("60f8b9e7eff9725b88f3925c")]}}}) 
            await Trucking_User.findByIdAndUpdate("60919d55fb7b079dbcba2bf9", {$pull: {loads:{$in: [ObjectId("607f8289c8bb1c7408eba11f")]}}})
            
              let test = await Dock_User.find({})
              // console.log("dock  users is:", test[0]._id)
              if (test) {
              for ( let i = 0 ; i < test.length; i ++ ) {
              await    Dock_User.findByIdAndUpdate(test[i]._id,{$pull: { loads: {$in : [ObjectId(args.loadRemoved)]}}})
              }
            }

              let test2 = await Trucking_User.find({})
              if (test2) {
              for ( let i = 0 ; i < test2.length; i ++ ) {
              await  Trucking_User.findByIdAndUpdate(test2[i]._id,{$pull: { loads: {$in : [ObjectId(args.loadRemoved)]}}})
              }
            }
              await Load_Test.findByIdAndRemove({_id: args.loadRemoved})           
            } else {
              const ObjectId = require('mongodb').ObjectID
              console.log("load removed is :", args.loadRemoved)
              let load1 = Load.findById(args.loadRemoved)

            //  await Trucking_User.findByIdAndUpdate( "607f81e9c8bb1c7408eba11c"  , {$pull: {loads: {_id:  "611f2411bf291f612cb49eab"}}}  ,      { safe: true })
            //  await Trucking_User.updateMany({_id:"607f81e9c8bb1c7408eba11c"},{$pull:{loads: {$in: [ObjectId("60f8b9e7eff9725b88f3925c")]}}}) 
            await Trucking_User.findByIdAndUpdate("60919d55fb7b079dbcba2bf9", {$pull: {loads:{$in: [ObjectId("607f8289c8bb1c7408eba11f")]}}})
            
              let test = await Dock_User.find({})
              // console.log("dock  users is:", test[0]._id)
              if (test) {
              for ( let i = 0 ; i < test.length; i ++ ) {
              await    Dock_User.findByIdAndUpdate(test[i]._id,{$pull: { loads: {$in : [ObjectId(args.loadRemoved)]}}})
              }
            }

              let test2 = await Trucking_User.find({})
              if (test2) {
              for ( let i = 0 ; i < test2.length; i ++ ) {
              await  Trucking_User.findByIdAndUpdate(test2[i]._id,{$pull: { loads: {$in : [ObjectId(args.loadRemoved)]}}})
              }
            }
              await Load.findByIdAndRemove({_id: args.loadRemoved})

            }

          },
          truckingLogin: async (parent, { userName, password }) => {
            const user = await Trucking_User.findOne( { userName } );
            console.log("user is :", user)
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
            console.log("password is :", password)
            const correctPw = await user.isCorrectPassword(password);
            console.log("correct pw is:", correctPw)
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
            const token = signTokenTrucker(user);
            console.log("token is now:", token)
            return { token, user };
          },
          dockLogin: async (parent, { name, password }) => {
            const user = await Dock_User.findOne( { name } );
            console.log("user is :", user)
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
            console.log("password is :", password)
            const correctPw = await user.isCorrectPassword(password);
            console.log("correct pw is:", correctPw)
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
            const token = signTokenDock(user);
            console.log("token is now:", token)
            return { token, user };
          },
          removeNullTruckerLoad: async (parent, args, context ) => {
            // await Load.findByIdAndRemove(null)
            // var cursor = Load.find()
            // while (cursor.hasNext()){
            //   var doc = cursor.next()
            //   var keys = {}
            //   var hasNull = false
            //   for ( var x in doc){
            //     if (x != "_id" && doc[x] == null)
            //     keys[x] = 1
            //     hasNull = true
            //   }
            // }
            // if (hasNull) {
            //   Load.findByIdAndUpdate( {$unset: keys})
            // }
            Load.remove(null)
          },
          addRequestedDocks : async (parent, args, context ) => {
            if (context.user.name === "test_dock" || context.user.name === "test_trucker"){
              if (context.user) {
                console.log("context.user is:", context.user.name )
                // console.log("args is :", args.loadAdded)
                return await Load_Test.findByIdAndUpdate(  {_id: args.loadId},  { $addToSet: {dock_Requests: {_id: context.user._id}}} )
              }
            } else {
              if (context.user) {
                console.log("context.user is:", context.user.name )
                // console.log("args is :", args.loadAdded)
                return await Load.findByIdAndUpdate(  {_id: args.loadId},  { $addToSet: {dock_Requests: {_id: context.user._id}}} )
              }              
            }

          }
      
    }

}

module.exports = resolvers;