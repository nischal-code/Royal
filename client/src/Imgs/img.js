import HP1 from "./Haldi/Photobooth/HP1.jpeg";
import HP2 from "./Haldi/Photobooth/HP2.jpeg";
import HP3 from "./Haldi/Photobooth/HP3.jpeg";
import HP4 from "./Haldi/Photobooth/HP4.jpeg";

import HSi1 from "./Haldi/Signage/HSi1.jpeg";
import HSi2 from "./Haldi/Signage/HSi2.jpeg";
import HSi3 from "./Haldi/Signage/HSi3.jpeg";
import HSi4 from "./Haldi/Signage/HSi4.jpeg";

import HSt1 from "./Haldi/Stage/HSt1.jpeg";
import HSt2 from "./Haldi/Stage/HSt2.jpeg";
import HSt3 from "./Haldi/Stage/HSt3.jpeg";
import HSt4 from "./Haldi/Stage/HSt4.jpeg";

import HE1 from "./Haldi/Entrance/HE1.jpeg";
import HE2 from "./Haldi/Entrance/HE2.jpeg";
import HE3 from "./Haldi/Entrance/HE3.jpeg";
import HE4 from "./Haldi/Entrance/HE4.jpeg";

import WP1 from "./Wedding/Photobooth/WP1.jpeg";
import WP2 from "./Wedding/Photobooth/WP2.jpeg";
import WP3 from "./Wedding/Photobooth/WP3.jpeg";
import WP4 from "./Wedding/Photobooth/WP4.jpeg";

import WSi1 from "./Wedding/Signage/WSi1.jpeg";
import WSi2 from "./Wedding/Signage/WSi2.jpeg";
import WSi3 from "./Wedding/Signage/WSi3.jpeg";
import WSi4 from "./Wedding/Signage/WSi4.jpeg";
import WSi5 from "./Wedding/Signage/WSi5.webp";

import WSt1 from "./Wedding/Stage/WSt1.jpeg";
import WSt2 from "./Wedding/Stage/WSt2.jpeg";
import WSt3 from "./Wedding/Stage/WSt3.jpeg";
import WSt4 from "./Wedding/Stage/WSt4.jpeg";
import WSt5 from "./Wedding/Stage/WSt5.webp";
import WSt6 from "./Wedding/Stage/WSt6.webp";

import WE1 from "./Wedding/Entrance/WE1.jpeg";
import WE2 from "./Wedding/Entrance/WE2.jpeg";
import WE3 from "./Wedding/Entrance/WE3.jpeg";
import WE4 from "./Wedding/Entrance/WE4.jpeg";
import WE5 from "./Wedding/Entrance/WE5.webp";

import WM1 from "./Wedding/Mandap/WM1.jpeg";
import WM2 from "./Wedding/Mandap/WM2.jpeg";
import WM3 from "./Wedding/Mandap/WM3.jpeg";
import WM4 from "./Wedding/Mandap/WM4.jpeg";

import RP1 from "./Reception/Photobooth/RP1.jpeg";
import RP2 from "./Reception/Photobooth/RP2.jpeg";
import RP3 from "./Reception/Photobooth/RP3.jpeg";
import RP4 from "./Reception/Photobooth/RP4.jpeg";

import RSi1 from "./Reception/Signage/RSi1.jpeg";
import RSi2 from "./Reception/Signage/RSi2.jpeg";
import RSi3 from "./Reception/Signage/RSi3.jpeg";
import RSi4 from "./Reception/Signage/RSi4.jpeg";

import RSt1 from "./Reception/Stage/RSt1.jpeg";
import RSt2 from "./Reception/Stage/RSt2.jpeg";
import RSt3 from "./Reception/Stage/RSt3.jpeg";
import RSt4 from "./Reception/Stage/RSt4.jpeg";

import RE1 from "./Reception/Entrance/RE1.jpeg";
import RE2 from "./Reception/Entrance/RE2.jpeg";
import RE3 from "./Reception/Entrance/RE3.jpeg";
import RE4 from "./Reception/Entrance/RE4.jpeg";

import MP1 from "./Mehendi/Photobooth/MP1.jpeg";
import MP2 from "./Mehendi/Photobooth/MP2.jpeg";
import MP3 from "./Mehendi/Photobooth/MP3.jpeg";
import MP4 from "./Mehendi/Photobooth/MP4.jpeg";

import MSi1 from "./Mehendi/Signage/MSi1.jpeg";
import MSi2 from "./Mehendi/Signage/MSi2.jpeg";
import MSi3 from "./Mehendi/Signage/MSi3.jpeg";
import MSi4 from "./Mehendi/Signage/MSi4.jpeg";

import MSt1 from "./Mehendi/Stage/MSt1.jpeg";
import MSt2 from "./Mehendi/Stage/MSt2.jpeg";
import MSt3 from "./Mehendi/Stage/MSt3.jpeg";
import MSt4 from "./Mehendi/Stage/MSt4.jpeg";

import ME1 from "./Mehendi/Entrance/ME1.jpeg";
import ME2 from "./Mehendi/Entrance/ME2.jpeg";
import ME3 from "./Mehendi/Entrance/ME3.jpeg";
import ME4 from "./Mehendi/Entrance/ME4.jpeg";

export const imgs = {
    Haldi:{
        Entrance :[
            HE1, HE2, HE3, HE4,
        ],
        Photobooth:[
            HP1, HP2, HP3, HP4,
        ],
        Signage:[
            HSi1, HSi2, HSi3, HSi4,
        ],
        Stage:[
            HSt1, HSt2, HSt3, HSt4,
        ],
    },
    Mehendi:{
        Entrance :[
            ME1, ME2, ME3, ME4,
        ],
        Photobooth:[
            MP1, MP2, MP3, MP4,
        ],
        Signage:[
            MSi1, MSi2, MSi3, MSi4,
        ],
        Stage:[
            MSt1, MSt2, MSt3, MSt4,
        ]
    },
    Wedding:{
        Entrance :[
            WE1, WE2, WE3, WE4,WE5,
        ],
        Photobooth:[
            WP1, WP2, WP3, WP4,
        ],
        Mandap:[
            WM1, WM2, WM3, WM4,
        ],
        Signage:[
            WSi1, WSi2, WSi3, WSi4,WSi5
        ],
        Stage:[
            WSt1, WSt2, WSt3, WSt4,WSt5,WSt6
        ]
    },
    Reception:{
        Entrance :[
            RE1, RE2, RE3, RE4,
        ],
        Photobooth:[
            RP1, RP2, RP3, RP4,
        ],
        Signage:[
            RSi1, RSi2, RSi3, RSi4,
        ],
        Stage:[
            RSt1, RSt2, RSt3, RSt4,
        ]
    }
};
const imageFiles = import.meta.glob("./*/*/*.{jpeg,jpg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});

export const imgPathByUrl = Object.fromEntries(
  Object.entries(imageFiles).map(([file, url]) => [url, file.replace("./", "")])
);
