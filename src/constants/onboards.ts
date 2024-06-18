import {ImageURISource} from 'react-native';

export type OnboardProps = {
  title: string;
  summary: string;
  image: ImageURISource;
  textButton: string;
};

export const onboards: OnboardProps[] = [
  {
    title: 'Lets explore the world ✈️',
    summary: 'Lets Explore the world with us with just a few clicks',
    image: {
      uri: 'https://i.pinimg.com/564x/81/b2/43/81b243da843465cc12de6b9187882800.jpg',
    },
    textButton: 'Next',
  },
  {
    title: 'Visit Tourist Attractions 🏖️',
    summary: 'find thousands of tourist destinations ready for you to visit',
    image: {
      uri: 'https://i.pinimg.com/564x/83/81/5c/83815cafe3576db2c29df1fbe1446a1d.jpg',
    },
    textButton: 'Next',
  },
  {
    title: 'Capture Your Moments 📸',
    summary:
      'Document your journey with beautiful photographs and cherish your memories forever',
    image: {
      uri: 'https://i.pinimg.com/564x/1f/af/fa/1faffa6eeff539a9ca13b4d9af4c4018.jpg',
    },
    textButton: 'Next',
  },
  {
    title: 'Get ready for next trip 🎒',
    summary:
      'Prepare yourself for your next adventure dive into thousands of breathtaking destinations awaiting your exploration.',
    image: {
      uri: 'https://i.pinimg.com/564x/58/d9/18/58d91826e75f3c21b4c97976e5689f9b.jpg',
    },
    textButton: 'Get Started',
  },
];
//  🥶
