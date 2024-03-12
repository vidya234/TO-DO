// install zod
const z = require("zod");

// write the zod schema

const createtodo = z.object({
    title : z.string(),
    description : z.string(),
   
});

const updatetodo = z.object({
    id : z.string()
});

module.exports = {
    createtodo : createtodo,
    updatetodo: updatetodo
}
