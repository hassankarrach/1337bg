import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import Backdrop from '@mui/material/Backdrop';

import { PiX } from 'react-icons/pi';
//Tmp
import TomGym from "../../../public/assets/under_dev.gif"
import zIndex from '@mui/material/styles/zIndex';

interface FadeProps {
  children?: React.ReactElement;
  in?: boolean;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onExited?: (node: HTMLElement, isAppearing: boolean) => void;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null as any, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null as any, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style}>
      {children}
    </animated.div>
  );
});

const StyledModal = styled.div`
  width : 100%;
  height : 100%;
  display : flex;
  .left_Mod{
    width : 40%;
    height : 100%;
    background-color :red;
    background-image : url(${TomGym.src});
    background-position : center;
    background-size : cover;
  }
  .Right_Mod{
    width : 60%;
    height : 100%;
    display : flex;
    flex-direction : column;
    justify-content  :center;
    align-items : flex-start;
    padding : 10px;
    a{
      text-decoration : none;
      color : #5B8BD1;
      font-weight :  500;
    }
    h1{
      font-size : 1.5rem;
      padding : 10px 0px;
    }
    p{
      font-size : 0.9rem;
    }
  }
`

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '600px',
  height: '60vh',
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '6px',
  boxShadow: 24,
  overflow: 'hidden',
};

interface Props {
  open: boolean;
  onClose: () => void;
}



const CustomModal: React.FC<Props> = ({ open, onClose }) => {
  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <StyledModal>
            <div className='left_Mod'>
            </div>
            <div className='Right_Mod'>
              <h1>Site Still Cooking</h1>
              <p>This website is currently under construction. Some features are still a work in progress (but they'll be up and running soon!). If you're interested in <a href='https://github.com/myrepo'>contributing</a> or have any suggestions, feel free to drop me a line on <a href='https://discord.com/me'>Discord</a>.</p>
            </div>
          </StyledModal>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CustomModal;
