import {MapSvg} from '../component/SvgComponent.jsx'

const AddressLinks = ({children, className=null}) => {

  if (!className) {
    className = ' my-3 '
  };
  className+= 'flex gap-1 font-semibold underline'

    return (
        <a
        className={className}
        target="_blank"
        href={"https://www.google.com/maps/place/" + children}
      >
        <MapSvg />
        {children}
      </a>
    )
}

export default AddressLinks;