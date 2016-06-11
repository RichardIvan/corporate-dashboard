// <!-- <?xml version="1.0" encoding="UTF-8" standalone="no"?> -->
import m from 'mithril'

const svg = `<svg width="19px" height="25px" viewBox="0 0 19 25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g transform="translate(-18.000000, -79.000000)">
            <g>
                <g transform="translate(19.000000, 80.000000)">
                    <circle stroke="#80838E" stroke-width="2" fill="#80838E" cx="8.5" cy="8.5" r="8.5"></circle>
                    <path d="M15,14 L8,22.2072683 L2,14 C2,14 10,14 15,14" stroke="#80838E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="#80838E"></path>
                    <circle fill="#D8D8D8" cx="8.5" cy="8.5" r="3.80150402"></circle>
                </g>
            </g>
        </g>
    </g>
</svg>`

const SVG = m.trust(svg)

export default SVG
