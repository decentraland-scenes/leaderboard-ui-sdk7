export type MyFakeData = {
  name:string,score:number
  userId:string,
  connStatus:"connected"|"disconnected",
  teamId:"blue"|"red",
  rank:number,
  health:number,
  healthMax:number
}
 
export let fakeLeaderboardData: MyFakeData[] = [
  {rank:1,name: "Francesco",  score:100,userId:"0x2984cb8cda17d3d24a76cb95c2e23e5f22a40a40",connStatus:"connected",teamId:"blue",health:(Math.random()*100),healthMax:100},
  {rank:1,name: "Will", score:200,userId:"",connStatus:"connected",teamId:"blue",health:(Math.random()*100),healthMax:100},
  {rank:1,name: "Anis", score:400,userId:"0x2984cb8cda17d3d24a76cb95c2e23e5f22a40a40",connStatus:"disconnected",teamId:"red",health:(Math.random()*100),healthMax:100},
  {rank:1,name: "Bence", score:300,userId:"",connStatus:"connected",teamId:"red",health:(Math.random()*100),healthMax:100},
  {rank:1,name: "Michal", score:600,userId:"0x2984cb8cda17d3d24a76cb95c2e23e5f22a40a40",connStatus:"disconnected",teamId:"red",health:(Math.random()*100),healthMax:100},
] 


let randomizeFakeLeadboardData: MyFakeData[] = []

export function getFakeDataSample(){
  return randomizeFakeLeadboardData
}

export function randomizeData(){
  randomizeFakeLeadboardData = fakeLeaderboardData.slice(0, Math.floor(Math.random()*fakeLeaderboardData.length) )
  if(Math.random() > .5){
      randomizeFakeLeadboardData.reverse()
  }
  let rank=1
  for(const p of randomizeFakeLeadboardData){
    p.rank = rank++
  }
}

randomizeData()