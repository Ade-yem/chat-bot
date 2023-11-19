import { TypeAnimation } from 'react-type-animation';

const Typing = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Chat with your own Customized AI',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'Where Conversations Come to Life',
        1000,
        'Engage, Interact, Learn',
        2000,
        'Built with ChatGPT',
        1000,
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '2em', display: 'inline-block', color: "wheat", textShadow: "1px 1px 20px #fff" }}
      repeat={Infinity}
    />
  );
};

export default Typing;