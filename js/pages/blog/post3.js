// addComparisons();
addAysTestComparisons();
configureComparisonSliders();
loadInAysTestImages();


function addComparisons() {
    let blue_before = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/blue_jacket_non_ays.png";
    let blue_after = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/blue_jacket_ays.png";

    let black_before = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/black_jacket_non_ays.png";
    let black_after = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/black_jacket_ays.png";

    let red_before = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/red_jacket_non_ays.png";
    let red_after = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/red_jacket_ays.png";

    let green_before = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/green_jacket_non_ays.png";
    let green_after = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/green_jacket_ays_img2img.png";
    // green img2img src: https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/green_jacket_ays_img2img.png

    let orange_before = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/orange_jacket_non_ays.png";
    let orange_after = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/orange_jacket_ays_img2img.png";
    // onrage non-ays img2img src: https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/orange_jacket_non_ays_img2img.png

    let blue_comp_html = comparisonElementHTML(blue_before, blue_after);
    let blue_comp_div = $($.parseHTML(blue_comp_html));

    let black_comp_html = comparisonElementHTML(black_before, black_after);
    let black_comp_div = $($.parseHTML(black_comp_html));

    let red_comp_html = comparisonElementHTML(red_before, red_after);
    let red_comp_div = $($.parseHTML(red_comp_html));

    let green_comp_html = comparisonElementHTML(green_before, green_after);
    let green_comp_div = $($.parseHTML(green_comp_html));

    let orange_comp_html = comparisonElementHTML(orange_before, orange_after);
    let orange_comp_div = $($.parseHTML(orange_comp_html));

    $('#blog-container').prepend(blue_comp_div);
    $('#blog-container').prepend(black_comp_div);
    $('#blog-container').prepend(red_comp_div);
    $('#blog-container').prepend(green_comp_div);
    $('#blog-container').prepend(orange_comp_div);

    configureComparisonSlider(blue_comp_div.find('.slider')[0]);
    configureComparisonSlider(black_comp_div.find('.slider')[0]);
    configureComparisonSlider(red_comp_div.find('.slider')[0]);
    configureComparisonSlider(green_comp_div.find('.slider')[0]);
    configureComparisonSlider(orange_comp_div.find('.slider')[0]);
}

function addAysTestComparisons() {
    let ays_1_reg = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/ays-reg-1.png";
    let ays_1 = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/ays-1.png";

    let ays_2_reg = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/ays-reg-2.png";
    let ays_2 = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/ays-2.png";

    let ays_1_comp_html = comparisonElementHTML(ays_1_reg, ays_1);
    let ays_1_comp_div = $($.parseHTML(ays_1_comp_html));

    let ays_2_comp_html = comparisonElementHTML(ays_2_reg, ays_2);
    let ays_2_comp_div = $($.parseHTML(ays_2_comp_html));

    $('#ays-test-1').append(ays_1_comp_div);
    $('#ays-test-2').append(ays_2_comp_div);
}

function loadInAysTestImages() {
    let ays_test_1 = document.getElementById('ays-test-1');
    let image_before = ays_test_1.querySelector('.image-before');
    var true_src = image_before.getAttribute('true_src');

    let actualImage_1 = new Image();
    actualImage_1.onload = function() {
        image_before.src = this.src;
    };
    actualImage_1.src = true_src;

    let image_after = ays_test_1.querySelector('.image-after');
    true_src = image_before.getAttribute('true_src');

    let actualImage2 = new Image();
    actualImage2.onload = function() {
        image_after.src = this.src;
    };
    actualImage2.src = true_src;
}