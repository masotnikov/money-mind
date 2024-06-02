import cl from './hr.module.scss'

const Hr = ({...props}) => {
  return (
    <hr className={cl.root} {...props}/>
  )
}

export default Hr;