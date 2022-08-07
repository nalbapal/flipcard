import '../../assets/css/nucleo-icons.css'
import '../../assets/css/nucleo-svg.css'
import '../../assets/css/soft-ui-dashboard.css?v=1.0.3'
import React, {useEffect, useMemo, useRef} from "react";
import Typed from "typed.js";

export const AboutUs = () => {
    const text = useMemo(() => ["Short Notes", "Quizes", "Words with definitions"], []);
    const divRef = useRef();

    useEffect(() => {
        const options = {
            strings: text,
            stringsElement: "#typed-string",
            typeSpeed: 50,
            showCursor: true,
            cursorChar: '🖋',
            backSpeed: 25,
            smartBackspace: false,
            shuffle: true,
            startDelay: 500,
            backDelay: 1000,
            loop: true,
            loopCount: Infinity
        };

        const typed = new Typed(divRef.current, options);

        return () => {
            typed.destroy();
        }

    }, [text]);
    return (
        <>
            <main>
                <div className="ms-4 mt-7">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-lg-12 mt-3">
                                <div className="card background">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-4 col-sm-12">
                                                <img className={"rounded-circle"} width={300} height={350}
                                                     src={"https://cdni.iconscout.com/illustration/premium/thumb/confused-man-1886536-1597947.png"}
                                                     alt="Fahad"/>
                                            </div>
                                            <div className="col-lg-8 col-sm-12">
                                                <h3>Flash Card App</h3>
                                                <div className="card-text text-bold about">
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam architecto consectetur eveniet molestias officiis optio praesentium quae rerum voluptatum. Consectetur corporis cumque debitis dolor libero minus natus perferendis quo temporibus velit. Animi dolorum ducimus eligendi est fugit laudantium, modi nam nemo odit placeat possimus, rerum sapiente sunt tenetur ut vel vero. Aperiam est eveniet incidunt nisi recusandae saepe tempora. Commodi dolorem doloremque enim excepturi explicabo facere, fugit illo laboriosam modi nobis numquam, omnis recusandae tempora totam unde voluptas voluptatum.
                                                    <h3>
                                                        Smart Learning By <span style={{color: 'red'}} ref={divRef}/>
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
