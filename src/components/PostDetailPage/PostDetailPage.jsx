import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

export default function PostDetails() {
  const [post, setPost] = useState({});
  const params = useParams();

  useEffect(() => {
    fetch(`/api/posts/${params.id}`)
      .then((response) => response.json())
      .then((json) => {
        setPost(json);
      });
  }, [params]);

  return (
    <div className="">
      <div className="bg-gray-300 p-8 mx-auto">
        <div className="container p-8 md:p-20">
          <h1 className="text-3xl md:text-6xl text-gray-800 font-bold mb-8">
            {post.title}
          </h1>
          <div className="text-md md:text-2xl my-8">
            <p>
              <span className="text-gray-600 mb-4">Quick Summary: </span>
              <span className="text-gray-800">{post.summary}</span>
            </p>
          </div>
          <div className="flex">
            <img
              alt={post?.author?.avatar || 'avatar'}
              className="rounded-full bg-white p-2 mr-4"
              src={post?.author?.avatar}
            />
            <div className="self-center">
              <p className="text-md text-gray-600 font-bold uppercsase py-1">
                <span className="font-normal">by</span> {post?.author?.name}{' '}
                <span className="font-normal">in</span>{' '}
                {post.categories &&
                  post.categories.map((c) => (
                    <span key={c.id} className="px-1">
                      {c.name}
                    </span>
                  ))}
              </p>
              <p className="text-md text-gray-500">
                {new Date(post.publishDate).toDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-8 md:py-16 px-10 md:px-20 text-xl">
        <p className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis
          consectetur libero. In vehicula tincidunt scelerisque. Aenean posuere
          nulla quis leo pulvinar blandit. Sed eleifend, libero non ultrices
          consectetur, orci nunc tincidunt ante, vitae lobortis velit lacus ut
          felis. Nam hendrerit nulla ac nibh rutrum sodales. Duis porttitor
          tincidunt nunc, ac pellentesque sem scelerisque a. Fusce nec mollis
          ipsum, ultrices egestas eros.
        </p>

        <p className="mb-4">
          Ut dolor nisi, consectetur pulvinar nisl et, eleifend feugiat ligula.
          Duis ut velit interdum, dictum massa sed, tincidunt quam. Ut ac justo
          tempor, blandit sapien et, ullamcorper nibh. Praesent aliquam purus
          vitae varius ornare. Maecenas sed quam a odio molestie volutpat.
          Aenean urna quam, ultricies eu vulputate id, imperdiet accumsan felis.
          Vivamus porttitor dui vitae porta vestibulum. Fusce gravida accumsan
          neque, sit amet suscipit sapien feugiat vel. Sed dapibus ipsum eu nisi
          mattis, eget malesuada nibh luctus. Cras pharetra sed eros id
          consequat. Sed sollicitudin mattis molestie. Donec vitae efficitur
          ipsum.
        </p>

        <p className="mb-4">
          Vestibulum ut volutpat velit. Fusce volutpat vestibulum augue a
          semper. Nunc sed nisi ac neque sagittis dignissim. Praesent interdum,
          neque a rhoncus molestie, justo libero volutpat augue, ut vestibulum
          purus nisi in lorem. Pellentesque habitant morbi tristique senectus et
          netus et malesuada fames ac turpis egestas. Quisque vehicula maximus
          blandit. Vivamus vel diam egestas, sodales libero ac, tincidunt nibh.
          Suspendisse potenti. Mauris a tortor elementum, tempus nisl eget,
          convallis sapien.
        </p>

        <p className="mb-4">
          Integer quis ante metus. Nam faucibus fringilla enim, et aliquet velit
          vulputate at. Nullam tempor nulla sit amet ex venenatis, at tincidunt
          quam tristique. Phasellus lacinia quam quam. Vestibulum tempor nisl
          sit amet magna varius dignissim egestas quis dolor. Curabitur eget
          sapien ac odio maximus viverra at eget lectus. Etiam dignissim et
          purus ac dapibus. Vestibulum luctus magna nulla. Donec consequat
          interdum nunc, vitae ornare metus placerat interdum. Cras vehicula
          aliquet tortor. Proin et sollicitudin leo. In sit amet orci mollis,
          mollis mauris vel, posuere libero. Nullam sit amet feugiat eros, non
          gravida est.
        </p>

        <p className="mb-4">
          Phasellus dapibus eros eget neque congue tristique. Aliquam nec
          faucibus nunc, et varius nisl. Suspendisse lacinia porta odio ut
          egestas. Duis odio lacus, maximus aliquam semper nec, placerat nec
          arcu. Donec consequat suscipit diam, ut vehicula eros faucibus nec.
          Etiam fringilla arcu vitae congue luctus. Phasellus eu viverra ex, sit
          amet ultricies dolor. Aenean vestibulum velit ut nisl volutpat
          malesuada. Quisque ut euismod lorem.
        </p>
      </div>
    </div>
  );
}
