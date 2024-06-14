const zod =require("zod")

const createTodo = zod.object({
    title: zod.string(),
    description:zod.string()

})

const updateTodo = zod.object({
    id: zod.string(),
    

})

module.exports ={
    createTodo: createTodo,
    updateTodo: updateTodo
}
/*
  {
     title: string,
     description:string,  //this block for post request is user written is validate or not

  }
 {
   id:string,  //for put requiest that is update 
 }
    

*/