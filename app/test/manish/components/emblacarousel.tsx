import React, { useState, useEffect, useCallback } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { Thumb } from './emblathub'
type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options,dumArray} = props
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true
  })

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi]
  )

  const handleSideButtons=(type:"next"| "prev")=>{
    if(type == "prev" && selectedIndex >0){
        onThumbClick(
            selectedIndex -1
        )
    }
    else if(type == "next" && selectedIndex <= slides.length){
        onThumbClick(
            selectedIndex +1
        )

    }
  }

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()

    emblaMainApi.on('select', onSelect).on('reInit', onSelect)
  }, [emblaMainApi, onSelect])

  return (
    <div className="embla">
    <div className="embla__viewport" ref={emblaMainRef}>
      <div className="embla__container">
        {slides.map((index) => (
          <div className="embla__slide" key={index}>
            <div className="embla__slide__number"><img src={dumArray[index]} alt="" /></div>
          </div>
        ))}
      </div>
    </div>
    <button
          onClick={()=>handleSideButtons("prev")}>prev</button>
    <div className="embla-thumbs">
      <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
      
        <div className="embla-thumbs__container">
          {slides.map((index) => (
            <Thumb
              key={index}
              onClick={() => onThumbClick(index)}
              selected={index === selectedIndex}
              index={index}
              img={dumArray[index]}
            />
          ))}
        </div>
        
      </div>
    </div>
    <button
          onClick={()=>handleSideButtons("next")}>next</button>
  </div>
  )
}

export default EmblaCarousel
