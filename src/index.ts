type Handle = () => Promise<string>
const name: string = 'Le Hieu Nghia'
const handle: Handle = () => Promise.resolve(name)
console.log(name)
const person: any = {}
handle().then((res) => {
  console.log(res)
})
