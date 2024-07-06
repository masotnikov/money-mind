import {FC} from "react";
import cl from './ProgressBar.module.scss'
interface ProgressBarProps {
  progress: number
}

const ProgressBar: FC<ProgressBarProps> = ({progress}) => {
  return (
    <div className={cl.progressBarContainer}>
      <div
        className={cl.progressBar}
        style={{width: `${progress > 100 ? 100 : progress}%`}}
      />
    </div>
  )
}

export default ProgressBar;