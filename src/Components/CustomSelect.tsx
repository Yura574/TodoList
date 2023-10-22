import s from './CustomSelect.module.css'
import arrow from './free-icon-point-down-7079981.svg'


export const CustomSelect = () => {
    const users =['lololo', '123', '21121asasasasaasasas']
    return (
        <div style={{marginLeft:'30px'}}>

            <div>
                <div className={s.wrapper}>
                    <div className={s.title}>titqwwqwq
                        <div style={{position: 'absolute', border: '1px solid black', top:' 100%', left: 0, width:'inherit'}}>{users.map(el => <div>{el}</div>)}</div>
                    </div>
                    <img className={s.arrow} src={arrow} alt=""/>

                </div>
            </div>

        </div>
    )
}