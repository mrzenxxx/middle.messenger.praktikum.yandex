export default function (xhr : XMLHttpRequest) {
    return `Status: ${xhr.status}${xhr.response? ', ' : '.'}${xhr.response?.reason||''}`   
}
