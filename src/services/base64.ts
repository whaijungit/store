const base64 = async (file: File) => {
  return new Promise<string>((reslove) => {
    const steam = new FileReader()
    steam.readAsDataURL(file)
    steam.addEventListener('load', e => reslove(e.target?.result as string))
  })
}

export default base64