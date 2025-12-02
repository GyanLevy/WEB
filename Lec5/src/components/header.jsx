import '../index.css'

export default function Header(prop){
    return (<h1 className="header">{`hello, ${prop.name}`}</h1>)
}
