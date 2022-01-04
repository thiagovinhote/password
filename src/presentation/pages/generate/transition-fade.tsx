import { motion } from 'framer-motion'

type Props = { className?: string }

export const TransitionFade: React.FC<Props> = props => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={props.className}
    >
      {props.children}
    </motion.div>
  )
}
