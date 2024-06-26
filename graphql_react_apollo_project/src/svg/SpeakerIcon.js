function SpeakerIcon({className}) {
    return (
      <svg fill="white" viewBox="0 0 15 15" height="1.5em" width="1.5em" >
        <g className={className}>
        <path
          fill={className}
          fillRule="evenodd"
          d="M7.47 1.05a.5.5 0 01.28.45v12a.5.5 0 01-.807.395L3.221 11H1.5A1.5 1.5 0 010 9.5v-4A1.5 1.5 0 011.5 4h1.721l3.722-2.895a.5.5 0 01.527-.054zm-.72 1.472L3.7 4.895A.5.5 0 013.393 5H1.5a.5.5 0 00-.5.5v4a.5.5 0 00.5.5h1.893a.5.5 0 01.307.105l3.05 2.373V2.522zm3.528 1.326a.4.4 0 01.555.111 6.407 6.407 0 010 7.081.4.4 0 01-.666-.443 5.607 5.607 0 000-6.194.4.4 0 01.111-.555zm2.4-2.418a.4.4 0 00-.61.518 8.602 8.602 0 010 11.104.4.4 0 00.61.518 9.402 9.402 0 000-12.14z"
          clipRule="evenodd"
        />
        </g>
      </svg>
    );
  }
  
  export default SpeakerIcon;
  