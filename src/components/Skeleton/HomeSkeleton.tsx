import ImageSkeleton from './ImageSkeleton'
import TextSkeleton from './TextSkeleton'
import SimpleInputSkeleton from './SimpleInputSkeleton'

const HomeSkeleton = () => {
  return (
    <>
       <div className="container  animate-fade-down">
        <div className='flex items-center gap-x-4 mb-[96px]'>
            <div>
            <TextSkeleton lines="3" />
            <SimpleInputSkeleton className='mt-4' />
            </div>
            <ImageSkeleton className="h-100 w-full" height="150px" />
        </div>
        <div className="mb-[96px]">
            <ImageSkeleton height="150px" />
        </div>

        <div className="flex justify-between mb-8">
            <ImageSkeleton className="min-w-[200px]" height="150px" />
            <ImageSkeleton className="min-w-[200px]" height="150px" />
            <ImageSkeleton className="min-w-[200px]" height="150px" />
        </div>
        <div className='mb-[96px]'>
            <ImageSkeleton className="w-full" height="70px" />
        </div>

        <div className='mb-[96px]'>
            <TextSkeleton className='w-[300px]' />
            <TextSkeleton className='w-[100px]' />
            <div className="flex justify-between mt-8">
                <ImageSkeleton className="min-w-[120px]" height="150px" />
                <ImageSkeleton className="min-w-[120px]" height="150px" />
                <ImageSkeleton className="min-w-[120px]" height="150px" />
                <ImageSkeleton className="min-w-[120px]" height="150px" />
            </div>
        </div>

        <div className='mb-[96px]'>
            <ImageSkeleton className="w-full" height="200px" />
        </div>
    </div>

    <ImageSkeleton className="w-full" height="400px " />

    <div className="container  animate-fade-down my-[96px]">
    <div className='mb-[96px]'>
            <TextSkeleton className='w-[300px]' />
            <TextSkeleton className='w-[100px]' />
            <div className="flex justify-between mt-8">
                <ImageSkeleton className="min-w-[120px]" height="150px" />
                <ImageSkeleton className="min-w-[120px]" height="150px" />
                <ImageSkeleton className="min-w-[120px]" height="150px" />
                <ImageSkeleton className="min-w-[120px]" height="150px" />
            </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 animate-fade-down h-[400px] mb-[96px]">
            
            <ImageSkeleton className="h-auto col-span-1"  withStart={<div className='row-start-1 row-end-1 col-start-1'>
                <TextSkeleton className='w-[300px]' />
                <TextSkeleton className='w-[100px]' />
            </div>} />
            <div className="grid grid-cols-1 gap-5 col-start-2">
              <ImageSkeleton className="col-span-1 h-100" height="100px" />
              <ImageSkeleton className="col-span-1" height="100px" />
              <ImageSkeleton className="col-span-1" height="100px" />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 animate-fade-down h-[400px]">
            
            <ImageSkeleton className="h-auto col-span-1"  withStart={<div className='row-start-1 row-end-1 col-start-1'>
                <TextSkeleton className='w-[300px]' />
                <TextSkeleton className='w-[100px]' />
            </div>} />
            <div className="grid grid-cols-1 gap-5 col-start-2">
              <ImageSkeleton className="col-span-1 h-100" height="100px" />
              <ImageSkeleton className="col-span-1" height="100px" />
              <ImageSkeleton className="col-span-1" height="100px" />
            </div>
          </div>
    </div>
    </>
  )
}

export default HomeSkeleton