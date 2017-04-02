#! user/bin/python

########### Python 2.7 #############
import httplib, urllib, base64, json
# from PIL.Image import core as Image
import PIL.Image as Image
import PIL.ImageDraw as ImageDraw

headers = {
    # Request headers
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': 'e1f3ade76dd046f4a4be11dd0eeb1571'
}

# Construct "returnFaceId=true&returnFaceLandmarks=true"
params = urllib.urlencode({
    # Request parameters
    'returnFaceId': 'true',
    'returnFaceLandmarks': 'true'
})

body = '{\'URL\': \'http://www.hack4fun.org/h4f/sites/default/files/bindump/lena_secret.bmp\'}'

# request() takes (verb, URL, body, headers)
try:
    conn = httplib.HTTPSConnection('westus.api.cognitive.microsoft.com')
    conn.request("POST", "/face/v1.0/detect?%s" % params, body, headers)
    response = conn.getresponse()
    
    # this is the landmarks body of the response
    data = response.read()
    print(data)
    conn.close()
except Exception as e:
    # print("[Errno {0}] {1}".format(e.errno, e.strerror))
    print e

 #Now start to tint the original image

urllib.urlretrieve("http://www.hack4fun.org/h4f/sites/default/files/bindump/lena_secret.bmp","test.bmp")
im = Image.open("test.bmp")
layer = Image.new('RGBA', im.size, (255, 0, 0, 1)) # "hue" selection is done by choosing a color...

decoded = json.loads(data)

TopLeft = decoded[0]['faceLandmarks']['mouthLeft']['x']
BottomLeft = decoded[0]['faceLandmarks']['upperLipTop']['y']
TopRight = decoded[0]['faceLandmarks']['mouthRight']['x']
BottomRight = decoded[0]['faceLandmarks']['underLipBottom']['y']

xy = ((decoded[0]['faceLandmarks']['mouthLeft']['x'], decoded[0]['faceLandmarks']['mouthLeft']['y']), (decoded[0]['faceLandmarks']['upperLipTop']['x'], decoded[0]['faceLandmarks']['upperLipTop']['y']), (decoded[0]['faceLandmarks']['mouthRight']['x'], decoded[0]['faceLandmarks']['mouthRight']['y']), (decoded[0]['faceLandmarks']['underLipBottom']['x'], decoded[0]['faceLandmarks']['underLipBottom']['y']))
draw = ImageDraw.Draw(im)
draw.polygon(xy, fill=(255,0, 0,0))


# landmarks = face.FaceLandmarks;
# TopLeft = landmarks.mouthLeft.X
# TopLeftX
# BottomLeft = landmarks.upperLipTop.Y
# TopRight = landmarks.mouthRight.X
# BottomRight = landmarks.underLipBottom.Y

# cropped = layer.crop((TopLeft, BottomLeft, TopRight, BottomRight))
# cropped.show

# #TODO: Fix the cropping to resize it and still keep it with the tint of red
# cropped_resized = cropped.new('RGBA', im.size, (100, 100, 100, 0))
#cropped.new("RGB", im.size)

# im_new = im.convert("RGBA")

#output = Image.blend(im_new, cropped_resized, 0.5)

im.save('output.bmp', 'BMP')
