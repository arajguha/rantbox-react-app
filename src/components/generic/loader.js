import React from 'react'

const Loader = (props) => {
    if(props.type === 'linear')
        return (
            <div class="progress">
                <div class="indeterminate"></div>
            </div>
        )

    return (
        <div class="preloader-wrapper small active">
            <div class="spinner-layer spinner-green-only">
            <div class="circle-clipper left">
                <div class="circle"></div>
            </div><div class="gap-patch">
                <div class="circle"></div>
            </div><div class="circle-clipper right">
                <div class="circle"></div>
            </div>
            </div>
        </div>
        
    )
}

export default Loader
